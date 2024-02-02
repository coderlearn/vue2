import { observe } from "./observe/index.js"

export function initState(vm) {
    console.log(vm)
    let opts = vm.$options
    if (opts.props) {
        initProps()
    }
    if (opts.data) {
        initData(vm)
    }
    if (vm, opts.methods) {
        initMethods()
    }
    // ...
}

function initProps() {

}

function initData(vm) {
    let data = vm.$options.data
    // console.log(data, typeof data == 'function')
    data = vm._data = typeof data == 'function' ? data() : data
    // 对data进行劫持
    // 将data 上的所有属性代理到 实例 {a:1,b:2}
    for(let key in data){
        proxy(vm, "_data", key)
    }
    observe(data)
    console.log(data)
}

function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue
        }
    })
}

function initMethods() {

}

