import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import userRouter from "./routes/userRoute.js"
import ownerRouter from "./routes/ownerRoute.js"
import bookingRouter from "./routes/bookingRoutes.js"

// Initialize express app 
const app = express()

// Middleware 
app.use(cors())
app.use(express.json())

// database connected
await connectDB()


app.get('/', (req, res) => res.send("Server is running"))

app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))