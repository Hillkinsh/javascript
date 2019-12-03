function Compile(el, vm) {
  this.$vm = vm;
  this.$el = this.isElementNode(el) ?
    el :
    document.querySelector(el);

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init() // 编译节点
    this.$el.appendChild(this.$fragment);
  }
}
let arr = []

Compile.prototype = {
  constructor: Compile,
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;
    // 文档片段存在于内存中，并不在DOM树中，
    // 所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。
    // 因此，使用文档片段通常会带来更好的性能。

    // 将原生节点拷贝到fragment
    // 如果被插入的节点已经存在于当前文档的文档树中,
    // 则那个节点会首先从原先的位置移除,然后再插入到新的位置
    while (el.firstChild) {
      fragment.appendChild(el.firstChild);
    }
    return fragment;
  },

  init: function () { // 编译节点
    this.compileElement(this.$fragment);
  },

  compileElement: function (el) {
    var childNodes = el.childNodes
    var me = this
    arr.slice.call(childNodes).forEach(node => {
      var text = node.textContent
      var reg = /\{\{(.*)\}\}/
      if (me.isElementNode(node)) { // nodeType == 1
        me.compile(node); // 元素节点编译
      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compileText(node, RegExp.$1.trim());
      }

      if (node.childNodes && node.childNodes.length) { // 递归
        me.compileElement(node);
      }
    })
  },

  compile: function (node) { // 元素节点
    var nodeAttrs = node.attributes
    var me = this
    arr.slice.call(nodeAttrs).forEach(function (attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) { // 该属性是否是指令 v-
        var exp = attr.value; // 方法名/属性名
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) { // on-事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        } else { // 普通指令
          // text
          // class
          // model
          // 等
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        node.removeAttribute(attrName);
      }
    })
  },

  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) { // v-的指令
    return attr.indexOf('v-') == 0;
  },
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) { // 元素节点
    return node.nodeType == 1;
  },
  isTextNode: function (node) { // 文本节点
    return node.nodeType == 3;
  }
};

// 指令处理集合
var compileUtil = {
  text: function (node, vm, exp) {
    this.compileBind(node, vm, exp, 'text');
  },

  html: function (node, vm, exp) {
    this.compileBind(node, vm, exp, 'html');
  },
  model: function (node, vm, exp) {

    // 绑定时，做了两个事情。
    // 1.修改node.value = vm[get(value)]
    // 2.对该节点做监听的相应属性初始化监听类
    //   就是word
    this.compileBind(node, vm, exp, 'model')

    var val = this._getVMVal(vm, exp)
    // 监听当前节点的输入，
    // 当输入值和vm上的不相登，
    // 则更新相应的vm的值
    node.addEventListener('input', e => {
      var newValue = e.target.value
      if (val === newValue) {
        return
      }
      this._setVMVal(vm, exp, newValue)
    });
  },
  class: function (node, vm, exp) {
    this.compileBind(node, vm, exp, 'class')
  },

  compileBind: function (node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater']; // 只是取到方法
    // model 则是给节点添加value属性
    // node.value = this._getVMVal(vm, exp)

    // 文本节点 
    // node.textContent = this._getVMVal(vm, exp)
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))

    // word
    // 对word做监听。
    // 监听的回调是修改node.value
    // TODO: 创建watcher后的作用
    // 相应的节点做一个watcher

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue)
    })
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1]
    var fn = vm.$options.methods && vm.$options.methods[exp]

    if (eventType && fn) { // 添加监听事件
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },

  _getVMVal: function (vm, exp) {
    // exp是从html属性上解析出来的一个属性值。
    // v-model='word'
    // exp = word
    // 取到vm上，vm.word 的值 hello world.
    var val
    console.log('heeloo , here.')
    exp.split('.').forEach(k => {
      val = vm[k]
    })
    return val
  },

  _setVMVal: function (vm, exp, value) {
    // 修改data属性的值。
    // 直接修改
    // vm.data.word
    var val = vm
    exp = exp.split('.')
    exp.forEach((k, i) => {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k]
      } else {
        val[k] = value
        // 修改this.word
        // 会触发 set
      }
    })
  }
}


var updater = {
  textUpdater: function (node, value) {
    // 文本节点
    let random = Math.random() + 'haha'
    node.textContent = typeof value == 'undefined' ? '' : value + random;
  },

  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, '').replace(/\s$/, '');

    var space = className && String(value) ? ' ' : '';

    node.className = className + space + value;
  },

  modelUpdater: function (node, value) {
    // 拿到节点和属性值，之后，节点value赋值
    node.value = typeof value == 'undefined' ? '' : value;
  }
};