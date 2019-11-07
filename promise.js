const isFunction = variable => typeof variable === 'function';
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class MyPromise {
	constructor(handle) {
		this._status = PENDING;
		this._value = undefined;
		this._fulfilledQueues = [];
		this._rejectedQueues = [];
		try {
			handle(this._resolve.bind(this), this._reject.bind(this));
		} catch (err) {
			this._reject(err);
		}
	}

	_resolve(val) {
		const run = () => {
			if (this._status !== PENDING) return;
			// 依次执行成功队列中的函数，并清空队列
			const runFulfilled = value => {
				let cb;
				while ((cb = this._fulfilledQueues.shift())) cb(value);
			};
			const runRejected = error => {
				let cb;
				while ((cb = this._rejectedQueues.shift())) cb(error);
			};
			if (val instanceof MyPromise) {
				val.then(
					value => {
						this._value = value;
						this._status = FULFILLED;
						runFulfilled(value);
					},
					err => {
						this._value = err;
						this._status = REJECTED;
						runRejected(err);
					}
				);
			} else {
				this._value = val;
				this._status = FULFILLED;
				runFulfilled(val);
			}
		};
		// 为了支持同步Promise，这里使用异步调用
		setTimeout(run, 0);
	}
	_reject(err) {
		const run = () => {
			this._value = err;
			this._status = REJECTED;
			let cb;
			while ((cb = this._rejectedQueues.shift())) {
				cb(err);
			}
		};
		setTimeout(run, 0);
	}
	then(onFulfilled, onRejected) {
		const { _value, _status } = this;
		return new MyPromise((onFulfilledNext, onRejectedNext) => {
			let fulfilled = value => {
				try {
					if (!isFunction(onFulfilled)) {
						onFulfilledNext(_value);
					} else {
						let res = onFulfilled(value);
						if (res instanceof MyPromise) {
							res.then(onFulfilledNext, onRejectedNext);
						} else {
							onFulfilledNext(res);
						}
					}
				} catch (err) {
					onRejectedNext(err);
				}
			};
			let rejected = err => {
				try {
					if (!isFunction(onRejected)) {
						onRejectedNext(error);
					} else {
						let res = onRejected(error);
						if (res instanceof MyPromise) {
							// 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
							res.then(onFulfilledNext, onRejectedNext);
						} else {
							//否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
							onFulfilledNext(res);
						}
					}
				} catch (error) {
					onRejectedNext(err);
				}
			};
			switch (_status) {
				// 当状态为pending时，将then方法回调函数加入执行队列等待执行
				case PENDING:
					this._fulfilledQueues.push(fulfilled);
					this._rejectedQueues.push(rejected);
					break;
				// 当状态已经改变时，立即执行对应的回调函数
				case FULFILLED:
					fulfilled(_value);
					break;
				case REJECTED:
					rejected(_value);
					break;
			}
		});
	}
	catch(onRejected) {
		this.then(null, onRejected);
	}
	finally(cb) {
		return this.then(
			value => MyPromise.resolve(cb()).then(value => value),
			reason =>
				MyPromise.resolve(cb()).then(() => {
					throw reason;
				})
		);
	}
	static resolve(val) {
		if (val) return MyPromise.resolve.then();
		if (val instanceof MyPromise) return val;
		if (val.hasOwnProperty('then'))
			MyPromise.resolve(val).then(value => value);
		return new MyPromise(resolve => resolve(val));
	}
	static reject(val) {
		return new MyPromise((resolve, reject) => reject(val));
	}
	static all(list) {
		return new MyPromise((resolve, reject) => {
			let values = [];
			let count = 0;
			for (let [index, item] of list.entries()) {
				this.resolve(item).then(
					res => {
						values[index] = res;
						count++;
						if (count === list.length) resolve(values);
					},
					err => {
						reject(err);
					}
				);
			}
		});
	}
	static race(list) {
		return MyPromise((resolve, reject) => {
			for (let [index, item] of list.entries()) {
				this.resolve(item).then(
					res => {
						resolve(res);
					},
					err => {
						reject(err);
					}
				);
			}
		});
	}
}