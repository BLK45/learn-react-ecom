const prisma = require('../config/prisma')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.regsiter = async(req,res)=>{
    try{
        const { email, password } = req.body
        if(!email){
            return res.status(400).json({ message: "Email is Required!!!"})
        }
        if(!password){
            return res.status(400).json({message: "Password is Required!!"})
        }
        

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(user){
            return res.status(400).json({message: "Email already exists!!"})
        }
        const hashPassword = await bcyrpt.hash(password, 10)
        
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        res.send('Regsiter Success')
    }catch (err) {
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
    
}

exports.login = async(req,res)=>{
    try{
        const { email, password } = req.body
        // step 1 Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(!user || !user.enabled){
            return res.status(400).json({message: "User Not found or not Enabled"})
        }
        // step 2 Check Password
        const isMatch = await bcyrpt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid Password!!!"})
        }
        // step 3 Create Payload
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        // step 4 Generate Token
        jwt.sign(payload,process.env.SECRET,{ expiresIn:
            '1d' },(err,token)=>{
                if(err){
                    return res.status(500).json({message: "Server error!!!"})
                }
                res.json({ payload, token })
            })
    }catch (err) {
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}

exports.currentUser = async(req,res)=>{
    try{
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.send(user)
    }catch (err) {
        console.log(err)
        res.status(500).json({ message : "Server Error"})
    }
}
