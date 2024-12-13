import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "property", required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guest: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    cancelled: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
})


const bookingModel = mongoose.models.booking || mongoose.model("booking", bookingSchema)
export default bookingModel 