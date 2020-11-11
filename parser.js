function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    /*
    测试账号
    1801020142
    测试密码
    166790
*/
console.log(html);
var json= JSON.parse(html);
//courseInfos课程信息
 let courseInfos=[];
//json.list.length获取课程数据长度
for(let i=0;i<json.list.length;i++){
//week[]是第几周有排课
    let week=[];
//lessonScope，这节课被安排在第几节
    let lessonScope=[];
//这门课第几周开始排课，第几周结束排课
        let week_math=json.list[i].weekScope.match(/\d+/g);
    let week_start=parseInt(week_math[0]);
    let week_end=parseInt(week_math[1]);
//判断单双周
        switch(json.list[i].schedulingTypeName) {
            case "仅单周排课":
             for(let i=week_start;i<week_end+1;i++){
            if(i%2!= 0){
              week.push(i);             
            }
            };
            break;
            case "仅双周排课":
           for(let i=week_start;i<week_end+1;i++){
            if(i%2== 0){
              week.push(i);             
            }
            };
            break;
            default:
            for(let i=week_start;i<week_end+1;i++){
            week.push(i);
            };    
    };
  // 使用正则表达式将上课节数添加进数组
   let lessonScope_num=json.list[i].lessonScope.match(/\d+/g);
    for(let i=0;i<lessonScope_num.length;i++){
           let sections={
           section:lessonScope_num[i],
       }
       lessonScope.push(sections);
       } 
//获取星期几，由大写转换为小写
let day=day_week(json.list[i].week)*1;
//课程信息填充
let course = {
                    name: json.list[i].courseName,
                    position:json.list[i].classroomPlace,
                    teacher: json.list[i].teacherNames,
                    weeks: week,
                    day:day,
                    sections:lessonScope,
                  };
                  courseInfos.push(course);
} 
//--------------------- sectionTimes是作息时间表，作息时间是固定不变的
let sectionTimes=[
      {
        "section": 1,
        "startTime": "08:15",
        "endTime": "09:00"
      },
      {
        "section": 2,
        "startTime": "09:05",
        "endTime": "09:50"
      },
      {
        "section": 3,
        "startTime": "10:10",
        "endTime": "10:55"
      },
      {
        "section": 4,
        "startTime": "11:00",
        "endTime": "11:45"
      },
      {
        "section": 5,
        "startTime": "14:00",
        "endTime": "14:45"
      },
      {
        "section": 6,
        "startTime": "14:50",
        "endTime": "15:35"
      },
      {
        "section": 7,
        "startTime": "15:55",
        "endTime": "16:40"
      },
      {
        "section": 8,
        "startTime": "16:45",
        "endTime": "17:30"
      },
      {
        "section": 9,
        "startTime": "19:00",
        "endTime": "19:45"
      },
      {
        "section": 10,
        "startTime": "19:46",
        "endTime": "20:30"
      }
    ];

//将courseInfos和sectionTimes填入
let result={
    courseInfos:courseInfos,
    sectionTimes:sectionTimes,
};
console.log(result);
return result;     

}

function day_week(aaa){
switch(aaa) {
     case "一":
        return 1;
     case "二":
       return 2;
        case "三":
       return 3;
        case "四":
       return 4;
        case "五":
       return 5;
        case "六":
       return 6;
        case "七":
       return 7;
     default:
        return 1;
  }
}