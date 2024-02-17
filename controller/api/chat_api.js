const userModel = require('../../models/userModel');
const roomModel = require('../../models/roomModel');






module.exports.getroom = async function (req, res) {
  
  console.log(req.body);

  try {
          let issue = await issueModal.create(
              req.body
          );
          
          res.redirect('back');

      }catch(err){

          console.log("Error in creating issue  :- "+err);
      }
}



  

module.exports.delete=async function(req,res){

  console.log("issue byApi delete"+req.params.issueId);

  try {
      const issueId = req.params.issueId;
      const deletedIssue = await issueModal.findByIdAndDelete(issueId);
      res.status(200).json({ message: 'Issue deleted successfully', deletedIssue });

  }catch(error) {

      console.error("issue delete error"+error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

