const File=require("../models/File");
 const cloudinary=require("cloudinary").v2;

//localfileupload ->1 handler function

exports.localFileUpload = async (req, res) =>{

  try {
    //fetch file from request
        const file=req.files.file;
          console.log("file aagyi jee",file);


         //create path where file need to be stored on server
         let path =__dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;
           console.log("PATH->",path)

           // add path to the move function

              file.mv(path,(err)=>{
              console.log(err);
                });


                //create a successful response
               res.json({
                success:true,
                 message:'Local File Uploaded Successfully'
               });

        } catch (error) {
           console.log("Not able to upload the file on server")
            console.log(error);
    }

}





function isFiletypeSupported(type, supportedTypes) {
       return supportedTypes.includes(type);
    }

    //upload a file using cloudinary upload function

    async function uploadFileToCloudinary(file, folder){
             const options={folder};
             options.resource_type,"auto";
             console.log("temp file path",file.tempFilePath);

          return await cloudinary.uploader.upload(file.tempFilePath, options);

      }

//image upload ka handler

exports.imageUpload = async (req, res) =>{
  try {

    //data fetch
        const {name, tags, email}=req.body;
         console.log(name,tags,email);

         const file=req.files.imageFile;
          console.log(file)

          //Validation
          const supportedTypes=["jpg","jpeg","png"];
          const fileType=file.name.split('.')[1].toLowerCase();
             console.log("File Type is :-", fileType)

          if(!isFiletypeSupported(fileType, supportedTypes)){
                 return res.status(400).json({
                  success:false,
                   message:'File format not supported',
                 });
            }

            //File format supported hai:-then upload cloudinary

                 console.log("Uploading to Fileupload");
             const response = await uploadFileToCloudinary(file,"Fileupload");
             console.log(response);

            //  db me entry save karni hai
              const fileData =await File.create({
                name,
                tags,
                email,
                imageUrl:response.secure_url,

              });


              res.json({
                success:true,
                imageUrl:response.secure_url,
                message:'Image Successfully Uploaded',
              })

  } catch (error) {
         console.error(error);
         res.status(400).json({
          success:false,
          message:'Something went wrong'
         });
  }
 }


 //video uploader ka handler

 exports.videoUpload = async (req, res)=>{
  try {
    //data fetch
  const {name, tags, email}=req.body;
   console.log(name,tags,email);
   const file = req.files.videoFile;


     //Validation
    const supportedTypes=["mp4","mov"];
   const fileType=file.name.split('.')[1].toLowerCase();
       console.log("File Type is :-", fileType)


    if(!isFiletypeSupported(fileType, supportedTypes)){
           return res.status(400).json({
            success:false,
             message:'File format not supported',
           })
      }

        //File format supported hai:-then upload cloudinary

        console.log("Uploading to Fileupload");
        const response = await uploadFileToCloudinary(file,"Fileupload");
        console.log(response);

         //  db me entry save karni hai
         const fileData =await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url,

        });

        res.json({
          success:true,
          imageUrl:response.secure_url,
          message:'video Successfully Uploaded',
        });

} catch (error) {
  console.error(error);
  res.status(400).json({
           success:false,
           message:'Something  Went Wrong'
});
}
 }
