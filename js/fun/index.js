/**
 * @flow
 * @param array
 * @returns {Array}
 */
export function dealArray(array:Array<any>) {

    let data = [];
    let data1 = [];

    for (let i in array){
        if (i!=='ok'){data.push(array[i])}
    }
    '男生,女生,漫画,出版'.split(',').forEach((typeTitle,index)=>{
        let obj = {key:typeTitle,data:[]};
        data.forEach((item1, i)=>{
            if(i===index){
                item1.forEach((item2,)=>{
                    'male,female,picture,press'.split(',').forEach((item,i1)=>{
                        if (i1 ===index){
                            item2.type = item
                        }
                    });
                });
                obj.data.push(item1)
            }
        });
        data1.push(obj);
    });
    return data1;
}

export default (dateTime, format) => {
    const date = new Date(dateTime);
    let fmt = format || 'yyyy-MM-dd';
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))) }
    return fmt
}

export function getTime(faultDate,completeTime) {


    let time;
    let stime  = Date.parse(new Date(faultDate));
    let etime = Date.parse(new Date(completeTime));
    let usedTime  = etime-stime;
    let days = Math.floor(usedTime/(24*3600*1000));
    //计算出小时数
    let leave1 = usedTime%(24*3600*1000);
    let hours = Math.floor(leave1/(3600*1000));
    //计算相差分钟数
    let leave2 = leave1%(3600*1000);
    let minutes =Math.floor(leave2/(60*1000));
    if (days>365){
        time = (days/365).toFixed(0)+'年前'
    }else if (days>=30){
        time = (days/30).toFixed(0)+'月前';
    }
    else if (days>=1 && days<=30){
        time = days + "天前"

    } else {
        if (hours<24 && hours>1){
            time = hours + "小时前";
        }else {
            if (minutes ===0){
                time = '刚刚';
            }else {
                time = minutes + "分钟前";
            }
        }
    }
    return time;
}

export function getSize(number,decimal) {

    let size ;

    if (number>10000){
        size = (number/10000).toFixed(decimal) + "万"
    }else {
        size = number
    }
    return size;
}


//去除换行
export function ClearBr(key) {
    key = key.replace(/<\/?.+?>/g,"");
    key = key.replace(/[\r\n]/g, "");
    return key;
}

