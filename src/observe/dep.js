import watcher from "./watcher"

let id = 0
class Dep{
    constructor(){
        this.id = id++
        this.subs = []
    }
    // 收集watcher
    depend(){
        // 我希望watcher 可以存放dep 双向
        // this.subs.push(Dep.target)
        Dep.target.addDep(this)
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    // 更新
    notify(){
        debugger
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}

// 添加watcher
Dep.target = null
export function pushTarget(watcher){
    debugger
    Dep.target = watcher
}

export function popTarget(){
    Dep.target = null
}

export default Dep