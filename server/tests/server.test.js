const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {          //significance of the method is to remove the todos before moving forward the code, as the todos length and                                     todos[0] shall return more than 1 value if todos is already present inside the database. **It will be                                       called before each test case, so it will clear all the data after  atest case is completed.
   Todo.deleteMany({}).then(()=>{
       done()
   });
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
            
            Todo.find().then((todos)=>{
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
               expect(todos.length).toBe(0);
               done();
           }).catch((err)=>{
              done(err);
           });
       });
    });
});

