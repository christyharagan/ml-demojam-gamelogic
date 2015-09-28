import { Observable, Observer, Disposable, Subject } from 'uservices';
export interface Doc<T> {
    uri: string;
    content: cts.DocumentNode<T>;
}
export declare function resolve<T>(value: T): Promise<T>;
export declare function resolveIterator<T>(valueIterator: cts.ValueIterator<T>): Promise<T[]>;
export declare function reject(error: any): Promise<any>;
export declare class AbstractMLService {
    constructor();
    observableFactory: <T>() => Observable<Doc<T>>;
}
export declare class BasicSubject<T> implements Subject<T>, Disposable {
    private observers;
    private index;
    private disposed;
    map<TResult>(selector: (value: T, index: number, source: Observable<T>) => TResult, thisArg?: any): Observable<TResult>;
    onNext(value: T): void;
    onError(e: any): void;
    onCompleted(): void;
    dispose(): void;
    subscribe(observer: Observer<T>): Disposable;
    subscribeOnNext(onNext: (value: T) => void, thisArg?: any): Disposable;
    subscribeOnError(onError: (exception: any) => void, thisArg?: any): Disposable;
    subscribeOnCompleted(onCompleted: () => void, thisArg?: any): Disposable;
}
export declare class BasicPromise<T> implements Promise<T> {
    private value;
    private error;
    constructor(value: T, error?: any);
    then<TResult>(onfulfilled?: (value: T) => TResult | Promise<TResult>, onrejected?: (reason: any) => TResult | Promise<TResult>): Promise<TResult>;
    catch(onrejected?: (reason: any) => T | Promise<T>): Promise<T>;
}
export declare class RemoteProxy {
    constructor(uri: string, options: xdmp.HttpOptions);
    private uri;
    private options;
    invokeMethod<T>(methodName: any, ...args: any[]): Promise<T>;
}
export declare class HttpObserver implements Observer<any> {
    constructor(uri: string, options: xdmp.HttpOptions);
    private uri;
    private options;
    onNext(value: any): void;
    onError(exception: any): void;
    onCompleted(): void;
}
