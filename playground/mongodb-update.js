const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client)=>{
    if(err){
        return console.log('we are unable to connect to MongoDB server');
    }
    console.log('Connected to mongoDB server');
    const db = client.db('TodoApp');
    
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5c24a4c8cd308860b973890b')
//    },{
//        $set:{
//            completed:true
//        }
//    },{
//        returnOriginal: false
//    }).then((result)=>{
//        console.log(result);
//    });
    db.collection('Users').findOneAndUpdate({
        name:'Prasad'
    },{
        $set:{
            name:'Santosh'
        },
        $inc:{
            age : +1
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });

});