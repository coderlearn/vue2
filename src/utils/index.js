export const HOOKS = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforedestroy",
    "destroyed"
]

let starts = {}
starts.data = function() {

}

HOOKS.forEach(item=>{
    starts[item] = mergeHook
})

function mergeHook(parentVal, childVal) {
    if(childVal){
        if(parentVal){
            return parentVal.concat(childVal)
        }else{
            return [childVal]
        }
    }else{
        return parentVal
    }
}

export function mergeOptions(parent, child){
    console.log(parent,child)
    // Vue.options = {created:[],watch:[]}
    const options = {}
    // if(Object.keys)
    for(let key in parent){
        mergeField(key)
    }
    // 兒子有父親沒有
    for(let key in child){
        mergeField(key)
    }
    function mergeField(key){
        //根據key 策略模式
        if(starts[key]){
            options[key] = starts[key](parent[key],child[key])
        }else{
            options[key] = child[key]
        }
    }
    console.log(options)
    return options
}