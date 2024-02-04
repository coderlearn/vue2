import { initGlobApi } from "./global-api/index.js"
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle.js"
import { renderMixin } from "./vnode/index.js"

function Vue(options){
    console.log(100, options)
    // 初始化
    this._initVue(options)

    // 模板编译
    if(options.el){
        this.$mounted(options.el)
    }
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

initGlobApi(Vue)
export default Vue