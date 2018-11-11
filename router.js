const express=require('express');
const dataall=require('./mydb');
var student=dataall.student;
const app=express();
function strat(app)
{
//  首页
    app.get('/',function(req,res){
        // 把所有的学生搜出来
        student.find({}).exec(function(err,data){
            if(err) throw err;
            // 把搜出来的数据发到首页，根据数据具体情况渲染不同的内容
            res.render('home',{data:data})
        })
    })
    // set data get方式用来添加数据
    app.get('/setdata',function(req,res){
        res.render('setdata',{data : req.query});
    })
  
    //获取数据
    app.post('/getdata',function(req,res){
        console.log(req.body);
        var objstu=new student({
            stunum : req.body.stunum,
            stuname : req.body.stuname,
            stuphone : req.body.stuphone,
            stusex : req.body.stusex,
            stuinfo : req.body.stuinfo
        })
        // 插入数据
        objstu.save(function(err,res){
            if(err) throw err;
        })
        // 插入成功以后回去首页
        res.redirect("/");
    })

    // 删除数据
    app.post('/delete',function(req,res){
        // 删除数据
        student.deleteOne({stunum : req.body.stunum},function(err){
            if(err) throw err; 
            // 删完以后回去首页
            res.redirect("/");
        })
    })

    //搜索
    app.get('/search',function(req,res){
        // res.send("ok");
        //检出存在不
       student.find({stunum : req.query.searchnum}).exec(function(err,data){
           if(err) throw data;
           else
           {
            //    检查搜索结果有没有，如果大于等于1说明存在，那就带着数据到首页，首页面临跟着data和title寻不存在对应不同的结果
               if(data.length>=1){
                //    存在
                res.render('home',{
                    title : '搜索结果如下：',
                    data : data
                })
               }else{
                //    不存在
                res.render("home",{
                    title : '对不起学号为'+req.query.searchnum+"的学生不存在！"
                })
               }
           }
       })
    })


}




module.exports=strat;