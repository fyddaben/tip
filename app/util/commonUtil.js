function add_zero(temp) {
    if(temp<10) return "0"+temp;
    else return temp;
}
var config = require('./config');
var Util = {
  staticSite:'http://tip.mi.com',
  searchSite: 'http://' + config.se_path + ':' + config.se_base,
  currentDate:function(){

    var d=new Date();
    var years = d.getYear()+1900;
    var month = add_zero(d.getMonth()+1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds=add_zero(d.getSeconds());
    var ndate = years+"-"+month+"-"+days+" "+hours+":"+minutes+":"+seconds;
    return ndate;

  },
  removeDou:function(summary){//去掉双引号
    if(summary.indexOf("\"")!=-1){
      do{
        summary=summary.replace("\"","'");
      }while(summary.indexOf("\"")!=-1)
    }
  return summary;
  },
  removeNull:function(summary){//去掉空格
    summary=summary.replace(/\s+/g,'');;
    return summary;
  }

}
module.exports = Util;
