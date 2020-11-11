function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑
    //以下为示例，您可以完全重写或在此基础上更改
alert("有问题请联系我解决 ，QQ878375551\n(oﾟ▽ﾟ)o\n\n---》登录\n---》选择信息查询\n---》推荐课表打印\n---》预览表格模式的课表\n{点击你需要导入的课表的名称进行预览，预览之后默认是表格模式}\n{也就是当你能看见完整课表时候}\n---》导入");       
const ifrs = dom.getElementsByTagName("iframe");
const frs = dom.getElementsByTagName("frame");

if (ifrs.length) {
    for (let i = 0; i < ifrs.length; i++) {
        const dom = ifrs[i].contentWindow.document;
        iframeContent += scheduleHtmlProvider(iframeContent, frameContent, dom);
        }
} 
if (frs.length) {
    for (let i = 0; i < frs.length; i++) {
        const dom = frs[i].contentDocument.body.parentElement; 
        frameContent += scheduleHtmlProvider(iframeContent, frameContent, dom);
        }
} 
if(!ifrs.length && !frs.length){
    return dom.querySelector('body').outerHTML
}
return dom.getElementsByTagName('html')[0].innerHTML + iframeContent+frameContent  
}