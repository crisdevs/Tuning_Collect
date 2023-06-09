// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/userModel');

// const userController = {
//     registerUser: async (req, res)=>{
//         const {name, email, password} = req.body;

//         //Check if user exists
//         const ifUserExists = await User.findOne({email});

//         if(ifUserExists){
//             res.status(400);
//             throw new Error('User already exists');
//         };

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         if(user){
//             res.status(201).json({
//                 _id: user.id,
//                 name: user.name,
//                 email: user.email
//             });
//         }
//         else{
//             res.status(400);
//             throw new Error('Invalid user data');
//         }
//     },
//     loginUser: async (req, res)=>{
//         const {email, password} = req.body;

//         const user = await User.findOne({email})
        
//         if(user && (await bcrypt.compare(password, user.password))){
//             res.status(201).json({
//                 _id: user.id,
//                 name: user.name,
//                 email: user.email
//             });
//         }
//         else{
//             res.status(400);
//             throw new Error('Invalid email or password');
//         }
//     }
// }

// module.exports = userController;