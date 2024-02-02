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
    Vue.prototype.$mounted = function(el){
        let vm = this
        console.log(vm)
        el = document.querySelector(el)
        let options = vm.$options

        //el template render
        if(!options.render){
            let template = options.template
            if(!template && el){
                debugger
                console.log(el)
                el = el.outerHTML
                console.log(el)
            }
        }
        // 初始化状态
        // initState(vm)
    }

}
// AST语法树 {} vnode {}

{/* <div id="app">hello{msg}</div> */}

