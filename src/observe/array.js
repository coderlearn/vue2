// 数组劫持
let oldArrayProtoMehods = Array.prototype
let arrMethods = Object.create(oldArrayProtoMehods)
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    // 'slice'
]
methods.forEach(item=>{
    arrMethods[item] = function(...args){
        console.log('劫持数组 --- 可以对数组进行操作')
        let result = oldArrayProtoMehods[item].apply(this, args)
        // 要处理数组追加方法 push unshift splice 
        let inserted 
        switch(item){
            case "push":
            case "unshift":
                inserted = args
                break
            case "splice":
                // todo
                break
        }
        return result
    }
})

export default arrMethods