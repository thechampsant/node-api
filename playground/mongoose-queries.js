const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c25f891001f9e5836c4e598';

if(!ObjectID.isValid(id))
    console.log(`id not valid`)

Todo.find({
    _id: id
}).then((todos)=>{
    console.log(`Todos: ${todos}`);
},(e)=>{
    console.log(e);
});


//findOne fetches the one item from the document the first one even if the other value matches the query
Todo.findOne({
    _id: id
}).then((todos)=>{
    console.log(`Todos: ${todos}`);
},(e)=>{
    console.log(e);
});

User.findById(id).then((user)=>{
    console.log(`id: ${user}`);
},(e)=>{
    console.log(e);
})