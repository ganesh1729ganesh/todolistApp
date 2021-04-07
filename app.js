
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");



const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});

const itemSchema = {
    name:String
};

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name: "Welcome to your todo-list! "
});

const item2 = new Item({
    name: "Hit  '+'  button to add a new item. "
});



const item3 = new Item({
    name: " <-- hit this to delete an item. "
});

const defaultItems = [item1,item2,item3];


app.get("/",function(req,res){  
    
    Item.find({},function(err,foundItems){

        if(foundItems.length===0){

            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("success! ");
                }
            })
            res.redirect("/");

        }else{
            if(err){
                console.log(err);
            }else{
                res.render('list',{listTitle:"Today",newListitems:foundItems});
            }
        }



        
    }) ;
    
});




app.post("/",function(req,res){

    let itemName = req.body.newitem;

    const item = new Item({
        name:itemName
    });

    item.save();
 
  res.redirect("/");


})

app.post("/delete",function(req,res){
    const checkedId = req.body.checkbox;
    Item.findByIdAndRemove(checkedId,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("deleted...");
            res.redirect("/");
        }
    });
});

app.get("/:paramName",function(req,res){
    const para = req.params.paramName;
    console.log(para);
    
})

app.get("/work",function(req,res){
    res.render('list',{listTitle:"work list",newListitems:workItems});
})

app.post("/work",function(req,res){
    let ite1 = req.body.newitem;
    workItems.push(ite1);
    res.redirect("/work");
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})



