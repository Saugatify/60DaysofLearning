// import connectDB from "./db/index.js";

// // Load environment variables from .env file
// dotenv.config({
//     path: './src/.env' // Corrected path to .env file
// });

// Debugging log
console.log("Environment Variables Loaded: ", process.env.MONGODB_URI);

// Connect to the database
connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log("Running");
    })
})
.catch((err)=>{
    console.log("Failed",err);
})




































// import express from "express"
// const app = express()

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error",(error)=>{
//         console.log("ERR");
//         throw error
//     })

//     app.listen(process.env.PORT,()=>{
//         console.log("listening the port");
//     })
//   } catch (error) {
//     console.log("ERROR", err);
//     throw err;
//   }
// })();
