const express= require("express");
 const router=express.Router();




 const{localFileUpload,imageUload}= require("../controllers/fileUpload")



 //api route

 router.post("/localFileUpload",localFileUpload);
 router.post("/imageUload",imageUload);

 module.exports= router;