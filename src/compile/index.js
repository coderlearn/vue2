import { __esModule } from "@babel/core"
import { generate } from "./generate"
import { parseHTML } from "./parseAst"




export function compileToFunction(el) {
    // console.log(el)
    let ast = parseHTML(el)
    // console.log(ast)
    // ast语法树变成 render函数  （1） ast语法树 变成 字符串  （2）字符串变成函数
    let code = generate(ast)
    // 获取render 字符串 变成 函数 
    let render = new Function(`with(this){return ${code}}`)
    console.log(render)
    return render
}



// AST语法树 {} vnode {}
// <div id="app">hello{msg}</div>

    // render(){
    //     // return _c('div', {id:app},_v{'hell'+__s(msg))},_c)
    // }

// {
//   tag: 'div',
//   attrs: [{id:""}]
// }
