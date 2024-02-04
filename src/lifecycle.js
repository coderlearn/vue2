import { patch } from "./vnode/patch"

export function mountComponent(vm,el){
    //源码
    vm._update(vm._render()) //vm._render 将 render 函数变成 vnode  // vm._update 将 vnode 变成真实dom
}

export function lifecycleMixin(Vue){
    //源码
    Vue.prototype._update = function(vnode){
        let vm = this
        vm.$el =  patch(vm.$el,vnode)
    } //vm._render 将 render 函数变成 vnode  // vm._update 将 vnode 变成真实dom
}


// vue面试题
// vue的渲染流程 =》数据初始化 =》 对模块进行编译 =》 变成render函数 =》 render函数变成 vnode 
// 真实dom =》 放到页面