const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')

// this is a signature string of jws which formed by us privately
const JWT_SECRET = "jsisreallyhard!tounderstand#"

//Route-1  Create a User using: post"/api/auth/createuser". No login required
router.post('/createuser',
// we would add validation checks for Email, Name, Password as shown below. Here, we have set the minimum character length of the name as '3' and that of password as '5'.
[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be greater than 5 character').isLength({ min: 5 }),
] ,async (req,res)=>{

  let success = false;
  // If an error occurs in the value then we would like to inform the user about his/her mistake by showing an error page.
  // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success , errors: errors.array() });
    }


    try{
    //this code find existing user and show respose
    let user = await User.findOne({email: req.body.email})
    if(user){
      return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }


    //it is used in implementing password Hashing, salt and pepper in Nodejs easily.
    //we will generate the salt and secondly, we will hash the password with the generated salt.
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Here 
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })


    const data = {
      user:{
        id:user.id
      }
    }
    // JWT is a JSON web token npm package, which helps in verifying a user.  JWT helps in facilitating secure communication between the server and the client. JSON web token consists of three parts- Header, Payload, and Signature. 
    success = true;
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success, authtoken})

    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal server error")
    }
})


//Route-2 Authenticate a User using: post"/api/auth/login". No login required
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
  
] ,async (req,res)=>{
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({error: "Please try to login with correct crendentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false;
      return res.status(400).json({success, error:"Please try to login with correct crendentials"})
    }

    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken})

  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})


//Route-3 get loggedin User details using: post"/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req,res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error")
  }

})


module.exports = router;