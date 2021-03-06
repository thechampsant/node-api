const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client)=>{
    if(err){
        return console.log('we are unable to connect to MongoDB server');
    }
    console.log('Connected to mongoDB server');
    const db = client.db('TodoApp'); //creating a database reference
//    
//    db.collection('Todos').insertOne({
//        text: 'This is mongo ',
//        completed: false
//    },(err,result)=>{
//        if(err){
//            return console.log('unable to insert todo',er0r);
//        }
//        console.log(JSON.stringify(result.ops,undefined,2));
//    });
//    
//    db.collection('Users').insertOne({  
//     
//        name: 'matt',
//        age : 24,
//        location: 'Kolkata'
//    },(err,result)=>{
//        if(err){
//            return console.log('unable to insert user',err);
//        }
//        console.log(JSON.stringify(result.ops,undefined,2));
//    });
////    
//    db.collection('Users').deleteMany({name:'matt'}).then((result)=>{
//        console.log(`deleteMany command worked: ${result}`);
//    },(err)=>{
//        console.log(`Something went wrong! ${err}`);
//    });
    
    db.collection('Users').deleteMany({_id: new ObjectID("5c24e7d1ba18ce41868bce6d")}).then((result)=>{
        console.log(`deleteMany command worked: ${result}`);
    },(err)=>{
        console.log(`Something went wrong! ${err}`);
    });
    
    client.close();
}); 

//this method takes two arguments 1st parameter will be a string, in production example this would the url where your                            database lives like AWS, Azure, or horuku url and stuff like that. 2nd argument is a callback func which will fire up                            after the connection made is succeeded or failed.
