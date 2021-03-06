const mongoose = require('mongoose');
const validator = require('validator'); 
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
   email:{
       type: String,
       reuired: true,
       minlength: 1,
       trim: true,
       unique: true,
       validate:{
           validator : function(v){
             return validator.isEmail(v);  
           },
           message:'{Value} is not a valid email'
       }
   }, 
    password:{
        type:String,
        require:true,
        minlength:6
    },
    
    tokens: [{
     access:{
         type:String,
         required: true
     },
        token:{
         type:String,
         required: true
        }
    }]
});

UserSchema.methods.toJSON = function (){
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();
    
    user.tokens =user.tokens.concat([{access,token}]);
    
    return user.save().then(()=>{
        return token;
    });
    
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    
    try{
        decode = jwt.verify(token,'abc123');
    }catch(e){
        
    }
    return User.findOne({
        '_id':decode._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
}
//we can add any instace methods we like


var User = mongoose.model('User',UserSchema);

module.exports = {
    User
};