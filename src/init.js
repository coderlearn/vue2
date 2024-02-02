import { initState } from "./initState"

export function initMixin(Vue){
    Vue.prototype._initVue = function(options){
        console.log(options)
        let vm = this
        console.log(vm)
        vm.$options = options
        // 初始化状态
        initState(vm)
    }
}


