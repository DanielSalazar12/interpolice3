const express = require("express");
const cors =require("cors");


const app = express();

app.use(cors())
app.use(express.json())

app.listen(4100,()=>{
    console.log(`server runnig in : $ 4100`)
})
