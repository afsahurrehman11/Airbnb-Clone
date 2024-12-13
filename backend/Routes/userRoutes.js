import express from "express"
import { bookProperty, cancelBooking, listBookings, loginUser, registerUser } from "../Controllers/userComtroller.js"
import authUser from "../Middleware/authUser.js"

const userRouter = express.Router()


userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/book-property", authUser, bookProperty)
userRouter.post("/bookings", authUser, listBookings)
userRouter.post("/cancel-bookings", authUser, cancelBooking);





export default userRouter