import { initMixin } from "./init"

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
export default Vue