require("dotenv").config();
const HirerModel = require("../models/HirerModel");
const CarOwnerModel = require("../models/CarOwnerModel")
const cloudinary = require("../config/cloudinary")
const CarModel = require("../models/CarModel");
const mongoose = require("mongoose");

const getAllUploadedCar = async (req,res) => {
    try {
        const allCars = await CarModel.find()
        res.status(200).json({message: "All Cars", data: allCars})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getOneCar = async (req,res) => {
    try {
        const id = req.params.id
        const oneCar = await CarModel.findById(id).populate("carOwner")
        res.status(200).json({message: "One Cars", data: oneCar})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const uploadCar = async (req,res) => {
    try {

        const {city,carModel,carBrand,carPlateNumber,pricePerHr,pricePerDay,pickUpLocation,priceForDriverPerHr,priceForDriverPerDay,driverAvailable} = req.body

        const carOwnerId = req.params.id
        console.log("wrong id")
        const findOwner = await CarOwnerModel.findById(carOwnerId)
        if(findOwner.verified === false){
            res.status(400).json({message: "Please complete your KYC for you to do this operation"})
            // console.log("wrong owner")
        }else{

            const image = await cloudinary.uploader.upload(req.file.path)
            // console.log("wrong image")

            const carUpload = new CarModel({
                city,
                carModel,
                carBrand,
                carPlateNumber,
                pricePerHr,
                pricePerDay,
                pickUpLocation,
                priceForDriverPerHr,
                priceForDriverPerDay,
                driverAvailable,
                carImageId: image.public_id,
                carImage: image.secure_url,
            })
            // console.log("wrong upload")

            carUpload.carOwner = findOwner._id

            carUpload.save()
            // console.log("wrong save")

            findOwner.CarUpload.push(mongoose.Types.ObjectId(carUpload._id))


            findOwner.save()
            // console.log("wrong owner saved")

            res.status(201).json({message: "Car Uploaded Successfully", data:carUpload })
        }
    } catch (error) {
        res.status(200).json({message: error})
    }
}

const populateASingleCarOwner = async (req,res) => {
    try {
        const id = req.params.id
        const findCarOwner = await CarOwnerModel.findById(id).populate("CarUpload")
        res.status(201).json({message: "All Uploaded Cars", data: findCarOwner})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
}

module.exports = {
    getAllUploadedCar,
    getOneCar,
    uploadCar,
    populateASingleCarOwner
}

