import {Observable, Observer, Disposable, Subject} from 'uservices'

export interface Doc<T> {
  uri: string
  content: cts.DocumentNode<T>
}

export function resolve<T>(value: T): Promise<T> {
  return new BasicPromise(value)
}

export function resolveIterator<T>(valueIterator: cts.ValueIterator<T>): Promise<T[]> {
  return <any>new BasicPromise(valueIterator)
}

export function reject(error: any): Promise<any> {
  return new BasicPromise(null, error)
}

export class AbstractMLService {
  constructor() {
    this.observableFactory = function() {
      return new BasicSubject()
    }
  }

  observableFactory: <T>() => Observable<Doc<T>>
}

export class BasicSubject<T> implements Subject<T>, Disposable {
  private observers: Observer<T>[] = []
  private index: number = 0
  private disposed: boolean = false

  map<TResult>(selector: (value: T, index: number, source: Observable<T>) => TResult, thisArg?: any): Observable<TResult> {
    let observable = new BasicSubject<TResult>()
    let self = this

    // TODO: This is very hacky... but wait until RX 3 for proper solution
    let onNext = observable.onNext
    let onError = observable.onError
    let onCompleted = observable.onCompleted

    this.subscribe({
      onNext(value: T): void {
        onNext.call(observable, selector(value, this.index++, self))
      },
      onError(exception: any): void {
        onError.call(observable, exception)
      },
      onCompleted(): void {
        onCompleted.call(observable)
      }
    })

    observable.onNext = this.onNext.bind(this)
    observable.onError = this.onError.bind(this)
    observable.onCompleted = this.onCompleted.bind(this)

    return observable
  }

  onNext(value: T) {
    if (!this.disposed) {
      this.observers.forEach(function(observer) {
        observer.onNext(value)
      })
    }
  }

  onError(e) {
    if (!this.disposed) {
      this.observers.forEach(function(observer) {
        observer.onError(e)
      })
    }
  }

  onCompleted() {
    if (!this.disposed) {
      this.observers.forEach(function(observer) {
        observer.onCompleted()
      })
    }
  }

  dispose(): void {
    this.disposed = true
    this.observers = []
  }

  subscribe(observer: Observer<T>): Disposable {
    if (!this.disposed) {
      this.observers.push(observer)
    }
    return this
  }

  subscribeOnNext(onNext: (value: T) => void, thisArg?: any): Disposable {
    if (!this.disposed) {
      this.observers.push({
        onNext: onNext.bind(thisArg),
        onError: function(e) { },
        onCompleted: function() { }
      })
    }
    return this
  }
  subscribeOnError(onError: (exception: any) => void, thisArg?: any): Disposable {
    if (!this.disposed) {
      this.observers.push({
        onNext: function(value) { },
        onError: onError.bind(thisArg),
        onCompleted: function() { }
      })
    }
    return this
  }
  subscribeOnCompleted(onCompleted: () => void, thisArg?: any): Disposable {
    if (!this.disposed) {
      this.observers.push({
        onNext: function(value) { },
        onError: function(e) { },
        onCompleted: onCompleted.bind(thisArg)
      })
    }
    return this
  }
}

export class BasicPromise<T> implements Promise<T> {
  private value: T
  private error: any
  constructor(value: T, error?: any) {
    if (Array.isArray(value)) {
      value = <any>xdmp.arrayValues(<any>value)
    }
    this.value = value
    this.error = error
  }
  then<TResult>(onfulfilled?: (value: T) => TResult | Promise<TResult>, onrejected?: (reason: any) => TResult | Promise<TResult>): Promise<TResult> {
    try {
      if (this.value !== undefined) {
        if (onfulfilled) {
          let ret = onfulfilled(this.value)
          if (ret && (<Promise<any>>ret).then) {
            return <Promise<any>>ret
          } else {
            return new BasicPromise(ret)
          }
        } else {
          return <Promise<any>>this
        }
      } else {
        if (onrejected) {
          let ret = onrejected(this.error)
          if (ret && (<Promise<any>>ret).then) {
            return <Promise<any>>ret
          } else {
            return new BasicPromise(ret)
          }
        } else {
          return <Promise<any>>this
        }
      }
    } catch (e) {
      return new BasicPromise(undefined, e)
    }
  }

  catch(onrejected?: (reason: any) => T | Promise<T>): Promise<T> {
    if (this.error) {
      try {
        let ret = onrejected(this.error)
        if (ret && (<Promise<any>>ret).then) {
          return <Promise<any>>ret
        } else {
          return new BasicPromise(ret)
        }
      } catch (e) {
        return new BasicPromise(undefined, e)
      }
    } else {
      return this
    }
  }
}

export class RemoteProxy {
  constructor(uri: string, options: xdmp.HttpOptions) {
    this.uri = uri
    this.options = options || {}
  }

  private uri: string
  private options: xdmp.HttpOptions

  invokeMethod<T>(methodName, ...args: any[]): Promise<T> {
    let ret = xdmp.httpPost(this.uri + '-' + methodName, this.options, args).toArray()

    if (ret[0].code === 200) {
      let value = ret[1].toObject()
      return resolve(value)
    } else {
      return reject(ret[0].message)
    }
  }
}

export class HttpObserver implements Observer<any> {
  constructor(uri: string, options: xdmp.HttpOptions) {
    this.uri = uri
    if (this.uri.indexOf('://') === -1) {
      this.uri = 'http://' + this.uri
    }
    this.options = options || {}
  }

  private uri: string
  private options: xdmp.HttpOptions

  onNext(value: any): void {
    xdmp.httpPost(this.uri, this.options, { value: value })
  }
  onError(exception: any): void {
    xdmp.httpPost(this.uri, this.options, { error: exception })
  }
  onCompleted(): void {
  }
}
