const userModel = require('../../models/userModel');
const roomModel = require('../../models/roomModel');





module.exports.getuser = async function (req, res) {

  console.log(req.body);

    try {

          let user = await userModel.find({});

          return res.status(200).json({
              
              data:user
            
            });
          
       
    } catch (error) {  
      
            console.log("GetUser Internal Server Error");

            console.error(error);
            return res.status(500).json({
            message: "GetUser Internal Server Error",
            });

          
    }
}






module.exports.getroom = async function (req, res) {

  console.log(req.body);

    try {

          let room = await roomModel.find({});

          return res.status(200).json({
              room
            
            });
          
       

    } catch (error) {

            console.error(error);
            return res.status(500).json({
            message: "Getroom Internal Server Error",
            });
      }
}


module.exports.createroom = async function (adminId,roomName) {

   try {

   
          let newroom = await roomModel.create({

                 name:roomName,
                 adminId:adminId,
                 privacy:'public',
                 users:[],
                 messages:[]
                 
          });

          console.log('MongoDB created new room :-' + roomName);
          console.log('Data of new room'+newroom);
 
       

    } catch (error) {

          console.log('Error in creating room in MongoDB')
    }
}




  


