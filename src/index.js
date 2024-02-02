import { initMixin } from "./init"

function Vue(options){
    console.log(100, options)
    // 初始化
    this._initVue(options)
}

initMixin(Vue)
export default Vue