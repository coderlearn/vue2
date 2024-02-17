import watcher from "./observe/watcher"
import { patch } from "./vnode/patch"

export function mountComponent(vm, el) {
    //源码
    // vm._update(vm._render()) //vm._render 将 render 函数变成 vnode  // vm._update 将 vnode 变成真实dom
    // callHook()
    let updateComponent = ()=>{
        vm._update(vm._render()) 
    }
    new watcher(vm,updateComponent,()=>{},true)  
    // callHook()
}

export function lifecycleMixin(Vue) {
    //源码
    Vue.prototype._update = function (vnode) {
        let vm = this
        vm.$el = patch(vm.$el, vnode)
    } //vm._render 将 render 函数变成 vnode  // vm._update 将 vnode 变成真实dom
}


// vue面试题
// vue的渲染流程 =》数据初始化 =》 对模块进行编译 =》 变成render函数 =》 render函数变成 vnode 
// 真实dom =》 放到页面
export function callHook(vm, hook) {
    console.log(vm.$options)
    const handlers = vm.$options[hook]
    if (handlers) {
        for (let i = 0; i < handlers.length; i++){
            handlers[i].call(vm)
        }
    }
}