function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    //除函数名外都可编辑
    //以下为示例，您可以完全重写或在此基础上更改
var json_msg="";
var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
json_msg=xmlHttp.responseText;
}}
xmlHttp.open("GET", "/student/courseTimetableDetail/getSemesterTimeTableList?_search=false&nd=1600173733295&pageSize=99&pageNum=1&sidx=&sord=asc",false);        
xmlHttp.send();
alert("提示：\n课表问题反馈请+QQ878375551\n无法或不会使用也可以联系我(*^▽^*)\n1、登录后无需操作，直接选择下方一键导入\n2、如果出现无法登录，提示内部错误，清除APP数据就行");
return json_msg;
}