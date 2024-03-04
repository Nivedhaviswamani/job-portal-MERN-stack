const mongoose=require("mongoose");
const JobDetailSchema=new mongoose.Schema({
   recruiterId:String,
   jobTitle:String,
   salary:Number,
   vacancies:Number,
   experience:Number,
   location:String,
   jobDescription:String, 
   jobRequirement:String, 
},
{
  collection:"jobdetail",  
});
const JobDetail=mongoose.model("jobdetail",JobDetailSchema);
module.exports=JobDetail;