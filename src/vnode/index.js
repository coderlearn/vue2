export function renderMixin(Vue){
    Vue.prototype._c = function(){
        
        console.log(...arguments)
        return createElement(...arguments)
    }
    Vue.prototype._v = function(text){
        return createText(text)
    }
    Vue.prototype._s = function(val){
        
        console.log(val)
        return val == null?"":(typeof val == 'object')?JSON.stringify(val):val
    }
    //源码
    Vue.prototype._render = function(){
        let vm = this
        let render = vm.$options.render
        let vnode = render.call(this)
        console.log(vnode)
        return vnode
    }
}

function createElement(tag, data= {}, ...children) {
    return vnode(tag,data,data?.key,children)
}

function createText(text){
    return vnode(undefined,undefined,undefined,undefined,text)
}

// 创建虚拟dom
function vnode(tag,data,key,children,text){
    return {
        tag,
        data,
        key,
        children,
        text,
    }
}

// export fuc