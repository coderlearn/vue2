
// Regular Expressions for parsing tags and attributes
const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute =
    /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
// const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`   //标签名称
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

function createASTElement(tag, attrs) {
    return{
        tag,
        attrs,
        children: [],
        type: 1,
        parent: null
    }
}

let root // 根元素
let createParent // 当前父元素
// 数据结构 栈
let stack = []  // [div,h,]

function start(tag, attrs) {
    // console.log(tag, attrs, '开始标签')
    let element = createASTElement(tag, attrs)
    if(!root){
        root = element
    }
    createParent = element
    stack.push(element)
}

function charts(text) {
    // console.log(text, '文本')
    // text = text.replace(/s/g, '')
    if(text){
        createParent.children.push({
            type: 3,
            text: text
        })
    }
}

function end(tag) {
    // console.log(tag, '---结束标签')
    let element = stack.pop()
    createParent = stack[stack.length-1]
    if(createParent){
        element.parent = createParent.tag
        createParent.children.push(element)
    }
}

// 遍历
export function parseHTML(html) {
    // todo 正则匹配
    //   const qnameCapture = ''  // 特殊标签
    //   ...
    while (html) {
        // <div id="app">hello{msg}</div>
        let textEnd = html.indexOf('<')
        if (textEnd == 0) {
            //开始标签
            const startTagMatch = parseStartTag()
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs)
                continue

            }

            let endTagMatch = html.match(endTag)
            if (endTagMatch) {
                advance(endTagMatch[0].length)
                end(endTagMatch[1])
            }
            //结束标签也有 <    

        }
        let text
        // 文本
        if (textEnd > 0) {

            //获取文本内容
            text = html.substring(0, textEnd)
            // console.log(text)
            charts(text)
        }
        if (text) {
            advance(text.length)
            // console.log(html)
        }
    }
    function parseStartTag() {


        const start = html.match(startTagOpen)  // 1结果 2 false

        if (start) {
            // console.log(start)
            // 创建ast 语法树
            let match = {
                tagName: start[1],
                attrs: []
            }
            // 删除开始标签
            advance(start[0].length)
            // 获取属性标签
            let attr
            let end
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                // console.log(attr)
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                // 删除开始标签
                advance(attr[0].length)
            }
            // console.log(end)

            if (end) {
                // console.log(end)
                advance(end[0].length)
                // advance
                return match
            }
        }

    }
    function advance(n) {
        html = html.substring(n)
        // console.log(html)
    }
    // console.log(root)
    return root
}