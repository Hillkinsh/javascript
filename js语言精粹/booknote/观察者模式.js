// 被观察者
function Subject() {
  this.observers = [];
}
Subject.prototype.add = function (observer) {
  this.observers.push(observer);
}
Subject.prototype.remove = function (observer) {
  if (this.observers.length) {
    for (let i = 0; i < this.observers.length; i++) {
      if (this.observers[i] === observer) {
        this.observers.splice(i, 1);
      }
    }
  }
}
Subject.prototype.notify = function () {
  if (this.observers.length) {
    for(let i = 0; i < this.observers.length; i++) {
      this.observers[i].update();
    }
  }
}

// 观察者

function Observer(name) {
  this.name = name;
}
Observer.prototype.update = function () {
  console.log("被通知了----我是观察者：", this.name);
}
let john = new Observer("john")
let bob = new Observer("bob")
let subSentence = new Subject();
subSentence.add(john)
subSentence.add(bob)
subSentence.notify();

subSentence.remove(bob)

subSentence.notify();

// 思路理解：
// 老师上课
// 被观察者（subject）老师
// 观察者（Observer）学生
// 学生观察老师上课，首先进入老师班级（add），不在班级的人（remove）不能收到老师安排的作业（notify）

/**
 * 发布订阅和观察者模式的区别是：增加了事件中心。
 * 
 */