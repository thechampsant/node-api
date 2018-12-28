const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true },(err, client)=>{
    if(err){
        return console.log(`Unable to connect to server ${err}`);
    }
    console.log('connected to the server');
    
    var db = client.db('TodoApp');
    
//    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
//        console.log(result);
//    });
//    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result)=>{
//        console.log(result);
//    });
    
    db.collection('Todos').findOneAndDelete({text:'Eat lunch'}).then((resutl)=>{
        console.log(resutl);
    });
    
//    client.close();
});