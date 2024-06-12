const mongoose = require('mongoose');

const expenseSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:15,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});
module.exports=mongoose.model('Expense',expenseSchema)