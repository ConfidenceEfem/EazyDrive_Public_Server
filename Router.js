const express = require("express")
const {HirerUpload,carOwnerUpload, CarUpload} = require("./config/multer")
const { SendCarOwnerOtp,CreateAccountForCarOwner, CarOwnerKYC, getOneCarOwner, populateCarBooking, signInCarOwner } = require("./controller/CarOwnerController")
const { uploadCar, getAllUploadedCar, getOneCar, populateASingleCarOwner } = require("./controller/CarUploadController")
const {SendHirerOtp,CreateAccountForHirer, HirerKYC, signInHirer, getOneHirer, populateHiredCars} = require("./controller/HirerController")
const { HireACar, CarOwnerAcceptRequest, CarOwnerDeclineRequest } = require("./controller/HiringController")
const router = express.Router()

// const {} = require("../controller/CarOwnerController")

router.post("/signup/hirer", SendCarOwnerOtp)

router.post("/signup/user", SendHirerOtp)

router.post("/verify", CreateAccountForCarOwner)

router.post("/sign/owner", signInCarOwner)

router.post("/sign/hirer", signInHirer)

router.get("/one/owner/:id", getOneCarOwner)

router.get("/one/hirer/:id", getOneHirer)

router.get("/one/owner/booking/:id", populateCarBooking)

router.get("/one/hirer/hiredCars/:id", populateHiredCars)

router.post("/verify/user", CreateAccountForHirer)

router.post("/hirer/kyc/:id", carOwnerUpload, CarOwnerKYC)

router.post("/user/kyc/:id", HirerUpload, HirerKYC)

router.post("/upload/car/:id",CarUpload, uploadCar)

router.get("/allCar", getAllUploadedCar)

router.get("/car/one/:id", getOneCar)

router.get("/car/owner/:id", populateASingleCarOwner)

router.post("/hire/:hirerId/:carId", HireACar)

router.post("/accept/booking/:id", CarOwnerAcceptRequest)

router.post("/decline/booking/:id", CarOwnerDeclineRequest)



module.exports = router