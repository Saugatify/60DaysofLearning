import express from "express"
const app = express()


const PORT = 8000

app.set('view engine','ejs');
app.set('views',path.resolve("./views"))

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})