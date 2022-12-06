const express = require("express");
const passport = require("passport");
const cors= require("cors");
const dotenv= require("dotenv");
const GoogleStrategy= require("passport-google-oauth20").Strategy;
const cookieSession= require("cookie-session")
const { notFound, errorHandler } = require("./Components/errorMiddleware");
const paymentRoutes = require("./Components/Router/payment");

const { mongoose } = require("mongoose");
const { Users } = require("./Modal/User");
 require('./service/passport')
const router = require("./Components/Router/authRoute");
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json())

// cookie session

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[process.env.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session())






require("./Components/Router/authRoute")(app)





app.use("/api/payment/", paymentRoutes);
app.get("/",async(req,res)=>{
    res.send("heloo")
})
// router------
app.get('/auth/google',passport.authenticate('google',{
    
    scope:['profile','email']
}))

app.get("/auth/google/callback",passport.authenticate('google'))
app.get("/current_user",(req,res)=>{
    res.send(req.user)
})
app.get("/api/logout",(req,res)=>{
    req.logout(); 
    res.send(req.user)
})

app.use(notFound)
app.use(errorHandler)


/*
const adduser=async(id,done)=>{
try {
   const userExist= await Users.findOne({googleId:id})
  if(!userExist)
   {
        const newUser= await Users.create({googleId:id})
        console.log(newUser)
        done(null,newUser)
       
    } 
    else{
        done(null,userExist)
        console.log(userExist,"already exist")
    }
} catch (error) {
    console.log(error)
}

} */
//clientid:  389619130799-oquonimh0g49hm5ci1vco063me410m33.apps.googleusercontent.com
// secrect ke:   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
console.log(process.env.GOOGLE_CLIENT_ID)


const URl=process.env.MONGO_URL
mongoose.connect(URl).then(()=>{
    console.log("db connected")
    console.log(process.env.cookieKey)
}).catch((e)=>{
    console.log(e)
});


port=process.env.PORT||5000
app.listen(port,()=>{
    console.log("Listing on port ",port)
})