const ExpenseSchema= require("../models/expense.model")
exports.addExpense = async (req, res) => {
    const{title , amount  , date , category , description}=req.body
    const Expense =ExpenseSchema({title ,
         amount  ,
          date ,
           category ,
            description
    })
    try {
        if(!title  || !category || !description){
            return res.status(400).json({message:"All fields are required"})
        }
        if(amount<=0 || !amount==='number'){
            return res.status(400).json({message:"Amount must be a positive number"})
        }
        await Expense.save()
        res.status(200).json({message:"Expense added successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

exports.getExpense = async(req,res)=>{
    try {
        const Expenses= await ExpenseSchema.find().sort({createdAt:-1});
        res.status(200).json(Expenses)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

exports.deleteExpense = async(req,res)=>{
    try {
       const {id}=req.params;
    //    console.log(id);
       const resp = await ExpenseSchema.deleteOne({_id:id})
       if(resp.deletedCount===0){
        return res.status(404).json({message:"Expense not found"})
       }else{
        return res.status(200).json({message:"Expense deleted successfully"})
       }
       
    } catch (error) {
        console.log(error)
        res.send("Internal server error")
    }
}