const expect = require('expect');
const request = require('supertest');
const {ObjectID} =require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Second test todo'
}]

beforeEach((done) => {          //significance of the method is to remove the todos before moving forward the code, as the todos length and                                     todos[0] shall return more than 1 value if todos is already present inside the database. **It will be                                       called before each test case, so it will clear all the data after  atest case is completed.
   Todo.deleteMany({}).then(()=>{
       return Todo.insertMany(todos);
   }).then(()=>done());
});



describe('POST /to',()=>{
    it('should create a new Todo',(done)=>{
       var text = 'Test todo text';
        
        request(app)
        .post('/to')
        .send({             //this data will be converted to json by supertest so no need to worry at all
            text
        })
        .expect(200)
        .expect((res)=>{
          expect(res.body.text).toBe(text)  
        })
        .end((err,res)=>{
           if(err){
             return done(err);
           } 
            
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err)=>{
                done(err)
            });
        });
    });
    
    it('should not create todo with invalid body data',(done)=>{
       request(app)
        .post('/to')
        .send({})
        .expect(400)
        .end((err,res)=>{
           if(err){
               return done(err);
           }   
           Todo.find().then((todos)=>{
               expect(todos.length).toBe(2);
               done();
           }).catch((err)=>{
              done(err);
           });
       });
    });
    
});

describe('GET /to',()=>{
    it('should get all todos',(done)=>{
       request(app)
        .get('/to')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
       })
        .end(done);
    });
});

describe('GET /to/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/to/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(todos[0].text);
        })
        .end(done); 
    });
    
    it('should return 404 if todo not found',(done)=>{
        var hexID = new ObjectID().toHexString();
        request(app)
        .get(`/to/${hexID}`)
        .expect(400)
        .end(done); 
    });
    
    it('should return 400 if todo not found',(done)=>{
        request(app)
        .get(`/to/123abc`)
        .expect(404)
        .end(done);
    });
});

