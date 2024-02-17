import { mergeOptions } from "../utils/index.js"

export function initGlobApi(Vue) {
    Vue.options = {}
    Vue.Mixin = function (mixin) {
        // 對象的合并
        this.options = mergeOptions(this.options,mixin)
    }
}

