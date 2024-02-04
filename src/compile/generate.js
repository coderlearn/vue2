const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
function genProps(attrs){
    console.log(attrs)
    let str = ''
    //
    for(let i=0; i<attrs.length;i++){
        let attr = attrs[i]
        if(attr.name == 'style'){
            let obj = {}
            attr.value.split(";").forEach(item => {
                let [key,val] = item.split(':')
                obj[key] = val
            });
            attr.value = obj
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},` 
    }
    return `{${str.slice(0,-1)}}`
}

function genChildren(el){
    let children = el.children
    if(children){
        let aaa = children.map(item => {
            return gen(item)
            // return 1
        }).join(',')
        console.log(aaa,'--------------')
        return aaa
    }
}

function gen(node){ // 1.元素 3.文本 
    if(node.type == 1){
        return generate(node)
    }else{ //文本
        // 判断是否有插值表达式
        let text = node.text
        if(!defaultTagRE.test(text)){
            return `_v(${JSON.stringify(text)})`
        }
        //带有 {{}}
        let tokens = []
        let lastindex = defaultTagRE.lastIndex = 0
        let match 
        while(match = defaultTagRE.exec(text)){
            console.log(match)
            let index = match.index
            if(index>lastindex){ //说明 插值表达式 前面还有内容
                tokens.push(JSON.stringify(text.slice(lastindex,index)))
            }
            // {{}}
            tokens.push(`_s(${match[1].trim()})`)
            lastindex = index + match[0].length
            
            if(lastindex < text.length){
                // console.log('sasasasa')
                // console.log('haaaa')
                tokens.push(JSON.stringify(text.slice(lastindex)))
            }
        }
        console.log(tokens )
        return `_v(${tokens.join('+')})`

    }
}

export function generate(el){
    console.log(el)
    let children = genChildren(el)
    console.log(children)
        let code = `_c('${el.tag}',${el.attrs.length? `${genProps(el.attrs)}`:'null'},${children?`${children}`:'null'})`
        console.log(code)
        return code

}