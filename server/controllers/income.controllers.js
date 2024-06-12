const IncomeSchema= require("../models/income.model")
exports.addIncome = async (req, res) => {
    const{title , amount  , date , category , description}=req.body
    console.log(req.body);
    const income =IncomeSchema({title ,
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
        await income.save()
        res.status(200).json({message:"Income added successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

exports.getIncome = async(req,res)=>{
    try {
        const incmomes= await IncomeSchema.find().sort({createdAt:-1});
        res.status(200).json(incmomes)
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

exports.deleteIncome = async(req,res)=>{
    try {
       const {id}=req.params;
    //    console.log(id);
       const resp = await IncomeSchema.deleteOne({_id:id})
       if(resp.deletedCount===0){
        return res.status(404).json({message:"Income not found"})
       }else{
        return res.status(200).json({message:"Income deleted successfully"})
       }
       
    } catch (error) {
        console.log(error)
        res.send("Internal server error")
    }
}