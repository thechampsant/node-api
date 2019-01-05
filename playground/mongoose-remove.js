const {ObjectID} = require('mongodb');

const {mongoose} =require('./../server/db/mongoose');
const {Todo} =require('./../server/models/todo');


Todo.remove({}).then((doc)=>{
    console.log(doc);
},(e)=>{
    console.log(e);
})