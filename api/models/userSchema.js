const mongoose = require("../config/mongodb");
const userSchema = new mongoose.Schema({
   
    f_name: {type:String, required:true},
    l_name: {type:String, required:true},
    password: {type:String,},
    email: {type: String, required: true, unique:true},
    city: {type: String, required: true,},
    address: {type: String,required: true,},    
    created_at:{type:Date,default:new Date()},
    updated_at:{type:Date,default: new Date()}
    
});
userSchema.virtual('products',{ref: 'product',localField: '_id',foreignField: 'user'});

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;
