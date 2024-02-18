const passport = require('passport');
const userModel = require('../../models/userModel');


module.exports.signup = async function (req, res) {

    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await userModel.findOne({ name:username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        let newuser = await userModel.create({ 

            name:username,
            password:password     
            
        });

        // Redirect to login page after successful registration
        return res.status(200).json({
              
            CreatedUser: newuser,
            userId:newuser._id
          
          });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};







