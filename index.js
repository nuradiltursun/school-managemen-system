const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
const start=require('./router');
const student=require('./mydb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
//设置模板视图的目录
app.set("views","./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache",true);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine","ejs");
//  渲染
start(app);

app.listen(5050,function(err,result){
    if(err) throw err;
    console.log('conecting 5050 succesfully...');
})