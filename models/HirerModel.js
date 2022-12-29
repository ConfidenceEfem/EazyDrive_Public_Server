const mongoose = require("mongoose")

const HirerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:[true, "Please input your name"]
    },
    email: {
        type: String,
        required: [true, "Please input your email"],
        unique: true,
    },
    password: {
        type: String, 
        required: [true, "Please input your password"],
        min: 5,
    },
    telephone: {
        type: Number, 
    },
    address: {
        type: String, 
    },
    City: {
        type: String, 
    },
    NationalId: {
        type: String, 
    },
    hiredCars: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carHiring"
        }
    ],
   
    verified: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    imageId: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("hirer", HirerSchema)