function scheduleHtmlParser(html) {
let courseInfos=[];
$('#kbgrid_table_0').find('td').each(function() {

  //判断是这节否有课
      if ($(this).hasClass('td_wrap') && $(this).text().trim() !== '') {
        //判断是否始终只有一门课在这节上
        if($(this).children('div').length==2){
           let week_0=$(this).find("div").eq(0).find("p").eq(1).text();
           let week_1=$(this).find("div").eq(1).find("p").eq(1).text();
           if(week_1==week_0){
             let name_0=$(this).find("div").eq(0).find("p").eq(0).text();
               let name_1=$(this).find("div").eq(1).find("p").eq(0).text();
               let name=name_0+"/"+name_1;
               let position_0=$(this).find("div").eq(0).find("p").eq(2).text();
               let position_1=$(this).find("div").eq(1).find("p").eq(2).text();              
               let position=position_0+"/"+position_1;
               let teacher_0=$(this).find("div").eq(0).find("p").eq(3).text();
               let teacher_1=$(this).find("div").eq(1).find("p").eq(3).text();
               let teacher=teacher_0+"/"+teacher_1;
               let day=$(this).attr('id').split('-')[0];
                 let course = {};
               let [weeks, sections] = getTime(week_0);
                   course.name = name;
                   course.teacher =teacher;
                   course.position = position;
                   course.sections = sections;
                   course.weeks = weeks;
                   course.day=day;
              courseInfos.push(course);  
           }else{
             for (let new_i=0;new_i<2;new_i++){
                     let week=$(this).find("div").eq(new_i).find("p").eq(1).text();
                     let name=$(this).find("div").eq(new_i).find("p").eq(0).text();
                     let position=$(this).find("div").eq(new_i).find("p").eq(2).text();
                     let teacher=$(this).find("div").eq(new_i).find("p").eq(3).text();
                     let day=$(this).attr('id').split('-')[0];
                     let course = {};
               let [weeks, sections] = getTime(week);
                   course.name = name;
                   course.teacher =teacher;
                   course.position = position;
                   course.sections = sections;
                   course.weeks = weeks;
                   course.day=day;
                   courseInfos.push(course); 
              }
           }
        }else{
           let week=$(this).find("div").eq(0).find("p").eq(1).text();
                     let name=$(this).find("div").eq(0).find("p").eq(0).text();
                     let position=$(this).find("div").eq(0).find("p").eq(2).text();
                     let teacher=$(this).find("div").eq(0).find("p").eq(3).text();
                     let day=$(this).attr('id').split('-')[0];
                     let course = {};
               let [weeks, sections] = getTime(week);
                   course.name = name;
                   course.teacher =teacher;
                   course.position = position;
                   course.sections = sections;
                   course.weeks = weeks;
                   course.day=day;
                   courseInfos.push(course); 
        }      
      }
 });
 console.log(courseInfos);
 let sectionTimes=[
      {
        "section": 1,
        "startTime": "07:50",
        "endTime": "08:30"
      },
      {
        "section": 2,
        "startTime": "08:40",
        "endTime": "09:20"
      },
      {
        "section": 3,
        "startTime": "09:40",
        "endTime": "10:20"
      },
      {
        "section": 4,
        "startTime": "10:30",
        "endTime": "11:10"
      },
      {
        "section": 5,
        "startTime": "11:20",
        "endTime": "12:00"
      },
      {
        "section": 6,
        "startTime": "14:30",
        "endTime": "15:10"
      },
      {
        "section": 7,
        "startTime": "15:20",
        "endTime": "16:00"
      },
      {
        "section": 8,
        "startTime": "16:10",
        "endTime": "16:50"
      },
      {
        "section": 9,
        "startTime": "17:00",
        "endTime": "17:40"
      },
      {
        "section": 10,
        "startTime": "19:30",
        "endTime": "20:10"
      },
      {
        "section": 11,
        "startTime": "20:20",
        "endTime": "21:00"
      },
      {
        "section": 12,
        "startTime": "21:10",
        "endTime": "21:50"
      }
    ];

    let result={
    courseInfos:courseInfos,
    sectionTimes:sectionTimes,
};
console.log(result);
return result; 
}



function getTime(str) {
  let t = str.split('节)')
  let reg = new RegExp('周', 'g')
  let weekStr = t[1].replace(reg, '')
  let weeks = getWeeks(weekStr)
  return [weeks, getSections(t[0].replace('(', ''))]
}

function getWeeks(str) {
  let flag = 0
  if (str.search('单') != -1) {
      flag = 1
      str = str.replace('单', '')
  } else if (str.search('双') != -1) {
      flag = 2
      str = str.replace('双', '')
  }
  let weeks = weekStr2IntList(str)
  weeks = weeks.filter((v) => {
      if (flag === 1) {
          return v % 2 === 1
      } else if (flag === 2) {
          return v % 2 === 0
      }
      return v
  })
  return weeks
}


function weekStr2IntList(week) {
  // 将全角逗号替换为半角逗号
  let reg = new RegExp("，", "g");
  week.replace(reg, ',');
  let weeks = [];

  // 以逗号为界分割字符串，遍历分割的字符串
  week.split(",").forEach(w => {
      if (w.search('-') != -1) {
          let range = w.split("-");
          let start = parseInt(range[0]);
          let end = parseInt(range[1]);
          for (let i = start; i <= end; i++) {
              if (!weeks.includes(i)) {
                  weeks.push(i);
              }
          }
      } else if (w.length != 0) {
          let v = parseInt(w);
          if (!weeks.includes(v)) {
              weeks.push(v);
          }
      }
  });
  return weeks;
}

function getSections(str) {
  let start = parseInt(str.split('-')[0])
  let end = parseInt(str.split('-')[1])
  let sections = []
  for (let i = start; i <= end; i++) {
      sections.push({ section: i })
  }
  return sections
}