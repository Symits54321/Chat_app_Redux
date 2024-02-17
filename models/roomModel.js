const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true

    },

    adminId:{
        type: String,
        required: true
    },
    
    privacy:{
        type: String,
        required: false
    },

    users:{
        type:Array,
        required:false
    },
    
    messages:{
        type: Array,
        required: true
    }
   
},{
    timestamps: true
});

const roomModel = mongoose.model('room_data', roomSchema);

module.exports = roomModel;