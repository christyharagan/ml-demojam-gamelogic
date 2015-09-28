export interface Observer<T> {
  onNext(value: T): void;
  onError(exception: any): void;
  onCompleted(): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): Disposable

  subscribeOnNext(onNext: (value: T) => void, thisArg?: any): Disposable
  subscribeOnError(onError: (exception: any) => void, thisArg?: any): Disposable
  subscribeOnCompleted(onCompleted: () => void, thisArg?: any): Disposable

  map<TResult>(selector: (value: T, index: number, source: Observable<T>) => TResult, thisArg?: any): Observable<TResult>
}

export interface Subject<T> extends Observer<T>, Observable<T> {
}

export interface Disposable {
  dispose(): void;
}
