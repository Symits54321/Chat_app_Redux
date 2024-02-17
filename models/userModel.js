const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: false
    }

    
   
},{
    timestamps: true
});

const userModel = mongoose.model('user_data', userSchema);

module.exports = userModel;