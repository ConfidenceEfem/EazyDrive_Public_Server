require("dotenv").config();
const HirerModel = require("../models/HirerModel");
const CarOwnerModel = require("../models/CarOwnerModel")
const cloudinary = require("../config/cloudinary")
const CarModel = require("../models/CarModel");
const mongoose = require("mongoose");
const HiringMOdel = require("../models/HiringModel");
const { CarHiredMail, AcceptCarHiredMail, DeclineCarHiredMail } = require("../config/Gmail");

const HireACar = async (req,res) => {
    try {
            const {noOfDays,noOfHrs,totalPrice,date,time,driverNeeded} = req.body

            const hirerId = req.params.hirerId
            const carId = req.params.carId

            const user = await HirerModel.findById(hirerId)
            if(!user.verified){
                res.status(400).json({message: "You can't hire a car. Please complete your KYC"})
            }else{
                const findCar = await CarModel.findById(carId)
                    if(!findCar){
                        res.status(400).json({message: "This car is no longer available"})
                    }else{
                        const findCarOwner = await CarOwnerModel.findById(findCar.carOwner)

                        const hiring = new HiringMOdel({
                            noOfDays,
                            noOfHrs,
                            totalPrice,
                            date,
                            time,
                            driverNeeded,
                        })

                        hiring.hirerId = user._id
                        hiring.carId = findCar._id

                        hiring.save()

                        user.hiredCars.push(mongoose.Types.ObjectId(hiring._id))
                        user.save()
                        findCarOwner.bookings.push(mongoose.Types.ObjectId(hiring._id))
                        findCarOwner.save()
                        findCar.allHiring.push(mongoose.Types.ObjectId(hiring._id))
                        findCar.save()

                        CarHiredMail(findCarOwner,hiring )
                        
                        res.status(201).json({message: "Your request has been sent to the car owner", data: hiring})
                 }
            }

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const CarOwnerAcceptRequest = async (req,res) => {
    try {
        const hiringRequestId = req.params.id

        const findRequest = await HiringMOdel.findByIdAndUpdate(
            hiringRequestId,
            {
                acceptOffer: true,
                pending: false,
            },
            {new: true}
        )

        const findHirer = await HirerModel.findById(findRequest.hirerId)
        const findCar = await CarModel.findById(findRequest.carId)
        const findCarOwner = await CarOwnerModel.findById(findCar.carOwner)


        AcceptCarHiredMail(findHirer, findRequest,findCar,findCarOwner)

        res.status(201).json({message: "Booking Successful", data: findRequest})


    } catch (error) {
        res.status(400).json({message: error.message})
        console.log(error)
    }
}
const CarOwnerDeclineRequest = async (req,res) => {
    try {
        const hiringRequestId = req.params.id

        const findRequest = await HiringMOdel.findByIdAndUpdate(
            hiringRequestId,
            {
                declineOffer: true,
                pending: false,
            },
            {new: true}
        )

        const findHirer = await HirerModel.findById(findRequest.hirerId)

        DeclineCarHiredMail(findHirer)

        res.status(201).json({message: "Booking Successful", data: findRequest})


    } catch (error) {
        res.status(400).json({message: error.message})
        // console.log(error)
    }
}

const getOneHiring = async (req,res) => {
    try {
        const id = req.params.id
        const oneHiring = await HiringMOdel.findById(id).populate("carId")
    } catch (error) {
          res.status(400).json({message: error.message})
    }
}

module.exports = {
    HireACar,
    CarOwnerAcceptRequest,
    CarOwnerDeclineRequest,
}