// Requiring all the npm installed packages
const express= require("express")
const bodyParser =require("body-parser")
const date= require(__dirname+"/date.js")

 
// Creating instances
const app= express()
var newItems=["Buy Food", "Eat Food","Cook Food"]
let workItems=[]


app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

// Making GET requesta
app.get("/",function(req,res){
    let weekdayName= date.getDate()
    res.render("list",{listTitle:weekdayName, newListItems:newItems})
})

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work", newListItems: workItems})
})

app.get("/about", function(req,res){
    res.render("about")
})


app.post("/work",function(req,res){
    let item=req.body.newItem;
    workItems.push(item)
    res.redirect("/work")
})

//Making POST requests 
app.post("/",function(req,res){
    var newItem=req.body.newItem
    if (req.body.list == "Work"){
        workItems.push(newItem)
        res.redirect("/work")
    }else{
        newItems.push(newItem)
        res.redirect("/")
    }
})



//Making server listen at port 3000

app.listen(3000,function(){
    console.log("Server is upa nd running at port 3000")
})