var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000; //process.env will work if its working on horuku and it wont run if it works locally

 
app.use(bodyParser.json());

app.post('/to',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.status(200).send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/to',(req,res)=>{
   Todo.find().then((todos)=>{
       res.send({
           todos
       })
   },(e)=>{
       res.status(400).send(e);
   }) 
});

app.get('/to/:id',(req,res)=>{
    
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    
    Todo.findById(req.params.id).then((doc)=>{
        if(doc)
            return res.status(200).send(doc);
        
        res.status(400).send(doc);
    },(e)=>{
        res.status(400).send();
    });
})

app.listen(port,()=>{
   console.log(`started up at port ${port}`); 
});

module.exports = {
    app
};
/*
focusing on post route this is going to let us create new Todos
This will let us create CRUD operations - create, read, update and delete
when you want to create a resource you use post http:// method and you send the resource as the body, when we want to make a new todo 
we will want to send json object over to the server it is going to have a test property and server is going to get that text property and create a new model and send the complete model with the id back to the client*/
