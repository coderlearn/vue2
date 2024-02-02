import { Observe } from "./observe/index.js"

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
    data = typeof data == 'function' ? data() : data
    // 对data进行劫持
    Observe(data)
    console.log(data)
}

function initMethods() {

}

