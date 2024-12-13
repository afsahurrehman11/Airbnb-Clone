import mongoose from "mongoose"



const propertySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true, min: 0, },
    amenities: {
        type: [String], // Array of amenities like 'Wi-Fi', 'Parking', 'Pool', etc
        default: [],
    },
    category: { type: String, required: true },
    distance: { type: String, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    image: { type: String, required: true },
    maxGuests: { type: Number, required: true, min: 1, },
    availability: { type: Boolean, default: true, },
    slots_booked: { type: Object, default: {} },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }

}, { minimize: false })

const propertyModel = mongoose.models.property || mongoose.model("property", propertySchema)


export default propertyModel

