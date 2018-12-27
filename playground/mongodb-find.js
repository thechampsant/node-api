const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client)=>{
    if(err){
        return console.log('we are unable to connect to MongoDB server');
    }
    console.log('Connected to mongoDB server');
    const db = client.db('TodoApp');
    
    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count}`);
//        console.log(JSON.stringify(docs, undefined, 2));
    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
  
    client.close();
}); 

//this method takes two arguments 1st parameter will be a string, in production example this would the url where your                            database lives like AWS, Azure, or horuku url and stuff like that. 2nd argument is a callback func which will fire up                            after the connection made is succeeded or failed.
