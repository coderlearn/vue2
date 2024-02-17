import { popTarget, pushTarget } from "./dep"

// 实现更新
let id = 0
class watcher {
    constructor(vm, updateComponent, cb, options) {
        this.vm = vm
        this.exprOrfn = updateComponent
        this.cb = cb
        this.options = options
        this.id++
        this.deps = []
        this.depsId = new Set()
        // 判断
        if(typeof updateComponent == 'function'){
            this.getter = updateComponent  // 用来更新视图
        }
        this.get()
    }
    addDep(dep){
        let id = dep.id
        if(!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
    }
    get(){
        pushTarget(this)
        this.getter()
        popTarget()
    }
    //更新
    update(){
        this.getter()
    }
}

export default watcher

// 收集依赖 vue dep watcher data: {name,msg}
// dep 一一对应组件里面data 属性
// watcher 在页面上用了几个属性 就有几个watcher
// dep 和 watcher 多对多


// 实现对象的收集依赖

// 实现数组的收集依赖
// 给所有对象类型增加一个dep
// 获取数组的值 会调用get方法 希望让当前数组记住这个渲染 watcher