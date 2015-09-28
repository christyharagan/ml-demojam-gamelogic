function resolve(value) {
    return new BasicPromise(value);
}
exports.resolve = resolve;
function resolveIterator(valueIterator) {
    return new BasicPromise(valueIterator);
}
exports.resolveIterator = resolveIterator;
function reject(error) {
    return new BasicPromise(null, error);
}
exports.reject = reject;
var AbstractMLService = (function () {
    function AbstractMLService() {
        this.observableFactory = function () {
            return new BasicSubject();
        };
    }
    return AbstractMLService;
})();
exports.AbstractMLService = AbstractMLService;
var BasicSubject = (function () {
    function BasicSubject() {
        this.observers = [];
        this.index = 0;
        this.disposed = false;
    }
    BasicSubject.prototype.map = function (selector, thisArg) {
        var observable = new BasicSubject();
        var self = this;
        var onNext = observable.onNext;
        var onError = observable.onError;
        var onCompleted = observable.onCompleted;
        this.subscribe({
            onNext: function (value) {
                onNext.call(observable, selector(value, this.index++, self));
            },
            onError: function (exception) {
                onError.call(observable, exception);
            },
            onCompleted: function () {
                onCompleted.call(observable);
            }
        });
        observable.onNext = this.onNext.bind(this);
        observable.onError = this.onError.bind(this);
        observable.onCompleted = this.onCompleted.bind(this);
        return observable;
    };
    BasicSubject.prototype.onNext = function (value) {
        if (!this.disposed) {
            this.observers.forEach(function (observer) {
                observer.onNext(value);
            });
        }
    };
    BasicSubject.prototype.onError = function (e) {
        if (!this.disposed) {
            this.observers.forEach(function (observer) {
                observer.onError(e);
            });
        }
    };
    BasicSubject.prototype.onCompleted = function () {
        if (!this.disposed) {
            this.observers.forEach(function (observer) {
                observer.onCompleted();
            });
        }
    };
    BasicSubject.prototype.dispose = function () {
        this.disposed = true;
        this.observers = [];
    };
    BasicSubject.prototype.subscribe = function (observer) {
        if (!this.disposed) {
            this.observers.push(observer);
        }
        return this;
    };
    BasicSubject.prototype.subscribeOnNext = function (onNext, thisArg) {
        if (!this.disposed) {
            this.observers.push({
                onNext: onNext.bind(thisArg),
                onError: function (e) { },
                onCompleted: function () { }
            });
        }
        return this;
    };
    BasicSubject.prototype.subscribeOnError = function (onError, thisArg) {
        if (!this.disposed) {
            this.observers.push({
                onNext: function (value) { },
                onError: onError.bind(thisArg),
                onCompleted: function () { }
            });
        }
        return this;
    };
    BasicSubject.prototype.subscribeOnCompleted = function (onCompleted, thisArg) {
        if (!this.disposed) {
            this.observers.push({
                onNext: function (value) { },
                onError: function (e) { },
                onCompleted: onCompleted.bind(thisArg)
            });
        }
        return this;
    };
    return BasicSubject;
})();
exports.BasicSubject = BasicSubject;
var BasicPromise = (function () {
    function BasicPromise(value, error) {
        if (Array.isArray(value)) {
            value = xdmp.arrayValues(value);
        }
        this.value = value;
        this.error = error;
    }
    BasicPromise.prototype.then = function (onfulfilled, onrejected) {
        try {
            if (this.value !== undefined) {
                if (onfulfilled) {
                    var ret = onfulfilled(this.value);
                    if (ret && ret.then) {
                        return ret;
                    }
                    else {
                        return new BasicPromise(ret);
                    }
                }
                else {
                    return this;
                }
            }
            else {
                if (onrejected) {
                    var ret = onrejected(this.error);
                    if (ret && ret.then) {
                        return ret;
                    }
                    else {
                        return new BasicPromise(ret);
                    }
                }
                else {
                    return this;
                }
            }
        }
        catch (e) {
            return new BasicPromise(undefined, e);
        }
    };
    BasicPromise.prototype.catch = function (onrejected) {
        if (this.error) {
            try {
                var ret = onrejected(this.error);
                if (ret && ret.then) {
                    return ret;
                }
                else {
                    return new BasicPromise(ret);
                }
            }
            catch (e) {
                return new BasicPromise(undefined, e);
            }
        }
        else {
            return this;
        }
    };
    return BasicPromise;
})();
exports.BasicPromise = BasicPromise;
var RemoteProxy = (function () {
    function RemoteProxy(uri, options) {
        this.uri = uri;
        this.options = options || {};
    }
    RemoteProxy.prototype.invokeMethod = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var ret = xdmp.httpPost(this.uri + '-' + methodName, this.options, args).toArray();
        if (ret[0].code === 200) {
            var value = ret[1].toObject();
            return resolve(value);
        }
        else {
            return reject(ret[0].message);
        }
    };
    return RemoteProxy;
})();
exports.RemoteProxy = RemoteProxy;
var HttpObserver = (function () {
    function HttpObserver(uri, options) {
        this.uri = uri;
        if (this.uri.indexOf('://') === -1) {
            this.uri = 'http://' + this.uri;
        }
        this.options = options || {};
    }
    HttpObserver.prototype.onNext = function (value) {
        xdmp.httpPost(this.uri, this.options, { value: value });
    };
    HttpObserver.prototype.onError = function (exception) {
        xdmp.httpPost(this.uri, this.options, { error: exception });
    };
    HttpObserver.prototype.onCompleted = function () {
    };
    return HttpObserver;
})();
exports.HttpObserver = HttpObserver;
//# sourceMappingURL=rfp.js.map