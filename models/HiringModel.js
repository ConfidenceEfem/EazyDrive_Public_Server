const mongoose = require("mongoose")

const HireACarSchema = new mongoose.Schema({
    noOfDays: {type: Number, required: true, default: 0},
    noOfHrs: {type: Number, required: true, default: 0},
    totalPrice: {type: Number, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    hirerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "hirer"
    },
    pending: {type: Boolean, default: true},
    acceptOffer: {type: Boolean, default: false},
    declineOffer: {type: Boolean, default: false},
    driverNeeded: {type: Boolean, default: false},
    carId: {type: mongoose.Schema.Types.ObjectId, ref: "carModel"}
}, {
    timestamps: true
})

module.exports = mongoose.model("carHiring", HireACarSchema)