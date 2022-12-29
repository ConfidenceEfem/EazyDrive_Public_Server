const mongoose = require("mongoose")

const CarModelSchema = new mongoose.Schema({
    carOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carOwner"
    },
    carImage: {
        type: String,
        required: true
    },
    carImageId: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
        required: true,
    },
    carBrand: {
        type: String,
        required: true,
    },
    carPlateNumber: {
        type: String,
        required: true,
        unique: true,
    },
    pricePerHr: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    pickUpLocation: {
        type: String,
        required: true
    },
    priceForDriverPerHr: {
        type: Number,
        default: 0,
    },
    priceForDriverPerDay: {
        type: Number,
        default: 0,
    },
    hired: {
        type: Boolean,
        default: false,
    },
    driverAvailable: {
        type: Boolean,
        default: false,
    },
    allHiring: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carHiring"
        }
    ]
    
}, {
    timestamps: true
})

module.exports = mongoose.model("carModel", CarModelSchema)