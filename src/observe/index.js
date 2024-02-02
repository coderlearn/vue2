
// import arrMethods from './array.js' 
export function observe(data) {
    console.log(data, '------observe')
    if(typeof data != 'Object' || typeof data == null){

    }else{
        return new Observe(data)
    }
}


class Observe{
    constructor(value){
        Object.defineProperty(value, __ob__, {
            enumerable: false,
            value: this
        })
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
    observe(value)
    Object.defineProperty(data,key, {
        // 可枚举
        // 只读
        // 可配置
        get(){
            console.log('获取obj')
            return value
        },
        set(newValue){
            console.log('设置obj')
            value = newValue
            observe(newValue)
        }
    })
}


// 处理对象 数组