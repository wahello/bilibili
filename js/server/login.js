var AV = require('leancloud-storage');
var user = new AV.User();
var username = user.setUsername('13718048209');
var password = user.setPassword('123456');
user.setEmail('582752848@qq.com');

export const login =()=>{
   user.logIn(username,password).then(res=>{
        console.log(res)
        alert('登录成功')
   },error=>{
       console.log(error)
   })
};



