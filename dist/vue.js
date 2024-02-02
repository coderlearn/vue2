(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    function Observe(data) {
      console.log(data, '------observe');
    }

    // 处理对象 数组

    function initState(vm) {
      console.log(vm);
      var opts = vm.$options;
      if (opts.props) ;
      if (opts.data) {
        initData(vm);
      }
      if (opts.methods) ;
      // ...
    }
    function initData(vm) {
      var data = vm.$options.data;
      // console.log(data, typeof data == 'function')
      data = typeof data == 'function' ? data() : data;
      // 对data进行劫持
      Observe(data);
      console.log(data);
    }

    function initMixin(Vue) {
      Vue.prototype._initVue = function (options) {
        console.log(options);
        var vm = this;
        console.log(vm);
        vm.$options = options;
        // 初始化状态
        initState(vm);
      };
    }

    function Vue(options) {
      console.log(100, options);
      // 初始化
      this._initVue(options);
    }
    initMixin(Vue);

    return Vue;

}));
//# sourceMappingURL=vue.js.map
