import Dep from "./dep"

// import arrMethods from './array.js' 
export function observe(data) {
    console.log(data, '------observe')
    if(typeof data != 'object' || typeof data == null){
        return data
    }else{
        return new Observe(data)
    }
}


class Observe{
    constructor(value){
        debugger
        Object.defineProperty(value, '__ob__', {
            enumerable: false,
            value: this
        })
        this.dep = new Dep()
        if(Array.isArray(value)){
            console.log(value)
            // value.__proto__ = arrMethods
            // 如果你是数组对象
            this.observeArray(value)
        }else{
            this.walkValue(value)       
        }
    }
    walkValue(data){
        
        let keys = Object.keys(data)
        for(let i = 0;i < keys.length; i++){
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }
    }
    observeArray(data){
        let keys = Object.keys(data)
        for(let i = 0;i < keys.length; i++){
            let key = keys[i]
            let value = data[key]
            defineReactive(data, key, value)
        }       
    }
}

function defineReactive(data, key, value){
    let childDep = observe(value)
    // let dep = new dep()
    // debugger

    let dep = new Dep()
    Object.defineProperty(data,key, {
        // 可枚举
        // 只读
        // 可配置
        get(){   // 收集watcher
            if(Dep.target){
                dep.depend()
                if(childDep.dep){
                    childDep.dep.depend()
                }
            }
            console.log('获取obj',dep,'----------------------------')
            return value
        },
        set(newValue){
            console.log('设置obj')
            value = newValue
            observe(newValue)
            dep.notify()
        }
    })
}


// 处理对象 数组