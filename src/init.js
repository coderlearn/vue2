import { compileToFunction } from "./compile/index.js"
import { initState } from "./initState"
import { callHook, mountComponent } from "./lifecycle.js"
import { mergeOptions } from "./utils/index.js"

export function initMixin(Vue){
    Vue.prototype._initVue = function(options){
        console.log(options)
        let vm = this
        // console.log(vm)
        
        // vm.$options = options
        console.log(Vue.options, options)
        vm.$options = mergeOptions(Vue.options, options)

        // 
        callHook(vm,'beforeCreate')
        // 初始化状态assa 
        initState(vm)
        // 颯颯阿薩颯颯
        callHook(vm,'created')

    }
    Vue.prototype.$mounted = function(el){
        let vm = this
        console.log(vm)
        el = document.querySelector(el)
        let options = vm.$options
        vm.$el = el
        //el template render
        if(!options.render){
            let template = options.template
            if(!template && el){
                el = el.outerHTML
                // <div id="app">hello{msg}</div>
                // 变成ast语法树
                // let ast = compileToFunction(el)
                let render = compileToFunction(el)
                // 1.将render函数变成 vnode,  将vnode 变成 真实dom
                options.render = render
            }
        }
        // 初始化状态
        // initState(vm)

        // // 挂载组件
        mountComponent(vm,el)

        // }
    }

}

