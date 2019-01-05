var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var _ = require('lodash');

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

app.post('/users',(req,res)=>{
 var body = _.pick(req.body,['email','password']);
 var user = new User(body);
    

 user.save().then(()=>{
    return user.generateAuthToken();
 }).then((token)=>{
     res.header('x-auth',token).send(user);
 }).catch((e)=>{
     res.send(e);
 })
});


app.listen(port,()=>{
   console.log(`started up at port ${port}`); 
});

module.exports = {
    app
};

/*there two types of methods model methods and instance methods:-
Model method is called on all User 'U'
instance method is called on indivisual user 'u'/

generateAuthTokebn will be resposnisble foradding 
indivisual user doc saving it and returning back the user
*


/*
focusing on post route this is going to let us create new Todos
This will let us create CRUD operations - create, read, update and delete
when you want to create a resource you use post http:// method and you send the resource as the body, when we want to make a new todo 
we will want to send json object over to the server it is going to have a test property and server is going to get that text property and create a new model and send the complete model with the id back to the client*/
