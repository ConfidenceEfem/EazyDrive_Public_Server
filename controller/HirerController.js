const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const HirerModel = require("../models/HirerModel");
const { verificationEmail } = require("../config/Gmail");
const otpModel = require("../models/OtpModel");
const cloudinary = require("../config/cloudinary")

const SendHirerOtp = async (req,res) => {
    try {
        const {email} = req.body
        const checkUser = await HirerModel.findOne({email})
        if(checkUser){
            res.status(400).json({message: "User already exist"})
        }else{
            const OTP = otpGenerator.generate(4, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            })

            console.log(OTP)

        verificationEmail(email, OTP)
         
          const otp = new otpModel({
            otp: OTP,
            email: email
          })

          const salt = await bcrypt.genSalt(10)
          otp.otp = await bcrypt.hash(otp.otp, salt)

          const result = await otp.save()

        res.status(201).json({message: "Check your mail for Verification"})


        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const CreateAccountForHirer = async (req,res) => {
    try {
        const {email, password, fullName,otp} = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const otpHolder = await otpModel.find({email})
        if(otpHolder.length === 0){
            res.status(400).send("You use an expired OTP");
        }else{
            const rightOtpFind = otpHolder[otpHolder.length - 1];
            const validUser = await bcrypt.compare(otp, rightOtpFind.otp);
            if(validUser){
                const user = await HirerModel.create({
                    email,
                    password: hash,
                    fullName
                  });
                  const token =  jwt.sign(
                    {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                    },
                    process.env.JWT_SECRET_KEY,
                    {expiresIn: "1d"}
                  )
                //   const result = await user.save();
                  const OTPDelete = await otpModel.deleteMany({
                    email: rightOtpFind.email,
                  });
                  return res.status(200).json({
                    message: "User Regisered successfully",
                    data: { token: token, data: user },
                  });
            }else{
                res.status(400).send("Invalid OTP")
            }
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const HirerKYC = async (req,res) => {
    try {
        const {
            telephone,
            address,
            City,
            NationalId
        } = req.body

        const id = req.params.id


        const image = await cloudinary.uploader.upload(req.file.path)

        const UpdateHirer = await HirerModel.findByIdAndUpdate(
            id,
            {
            telephone,
            address,
            City,
            image: image.secure_url,
            imageId: image.public_id,
            NationalId
            },
            {new: true}
            )

            if(UpdateHirer.telephone,UpdateHirer.address,UpdateHirer.City,UpdateHirer.image,UpdateHirer.imageId,UpdateHirer.NationalId){
                const updateVerify = await HirerModel.findByIdAndUpdate(
                    id, 
                    {verified: true},
                    {new: true}
                )
                res.status(201).json({message: "KYC Verification Successful", data: updateVerify})
            }else{
                res.status(201).json({message: "UnCompleted", data: UpdateHirer })
            }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const signInHirer = async (req,res) => {
    try{
        const {email, password} = req.body
        const findUser = await HirerModel.findOne({email})
        if(!findUser){
            res.status(400).json({message: "Incorrect Email or Password"})
        }else{
            const checkPassword = await bcrypt.compare(password,findUser.password)
            if(!checkPassword){
                res.status(201).json({message: "Incorrect Email or Password"})
            }else{
                const token = jwt.sign(
                    {
                        id: findUser._id,
                        fullName: findUser.fullName,
                        email: findUser.email,
                    },
                    process.env.JWT_SECRET_KEY,
                    {expiresIn: "1d"}
                )

              
                  return res.status(200).json({
                    message: "Login successfully",
                    data: { token: token, data: findUser },
                  });
            }
        }
    }catch(error){
         res.status(404).json({message: error.message})
    }
}

const getOneHirer = async (req,res) => {
    try {
        const id = req.params.id
        const findUser = await HirerModel.findById(id)
        res.status(201).json({message: "One Hirer", data: findUser})
    } catch (error) {
         res.status(404).json({message: error.message})
    }
}

const populateHiredCars = async (req,res) => {
    try {
        const id = req.params.id
        const findUser = await HirerModel.findById(id).populate("hiredCars")
        res.status(201).json({message: "Populate Hired Cars", data: findUser})
    } catch (error) {
         res.status(404).json({message: error.message})
    }
}


module.exports = {
    SendHirerOtp,
    CreateAccountForHirer,
    HirerKYC,
    signInHirer,
    getOneHirer,
    populateHiredCars
}
