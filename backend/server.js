import app from "./src/app.js";
import db from "./src/config/db.js"

const PORT = process.env.PORT || 3000;

db()
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})