
import { v2 as cloudinary } from "cloudinary"
import propertyModel from "../Models/propertyModel.js"
import jwt from "jsonwebtoken"
import validator from "validator"
import bookingModel from "../Models/bookingModel.js";

const addProperty = async (req, res) => {
    try {
        const { title, description, location, pricePerNight, amenities, category, maxGuests, distance, checkin, checkout } = req.body;
        const imageFile = req.file;

        // Check for all required fields
        if (!title || !description || !location || !pricePerNight || !maxGuests || !category || !amenities || !distance || !checkin || !checkout) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Get the userId from req.user
        const userId = req.user.userId;

        // Create the property data
        const propertyData = {
            title,
            description,
            location,
            pricePerNight,
            amenities,
            category,
            distance,
            checkin,
            checkout,
            maxGuests,
            image: imageUrl,
            userId, // Attach userId here
        };

        // Save the property
        const newProperty = new propertyModel(propertyData);
        await newProperty.save();

        res.status(200).json({ success: true, message: "Property Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const allProperties = async (req, res) => {
    try {
        const { userId } = req.user; // Assuming req.user contains the authenticated user's information

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        // Find properties with the same userId
        const propertyList = await propertyModel.find({ userId });

        res.status(200).json({ success: true, propertyList });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



const availabilityChangeByHost = async (req, res) => {
    try {
        const { userId } = req.user; // Assuming req.user contains the authenticated user's information
        const { propertyId } = req.body;

        if (!userId || !propertyId) {
            return res.status(400).json({ success: false, message: "User ID or Property ID is missing" });
        }

        // Find the property by ID and check ownership
        const propertyData = await propertyModel.findOne({ _id: propertyId, userId });

        if (!propertyData) {
            return res.status(404).json({ success: false, message: "Property not found or not owned by user" });
        }

        // Update the availability of the property
        propertyData.availability = !propertyData.availability;
        await propertyData.save();

        res.json({ success: true, message: "Availability changed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const deleteProperty = async (req, res) => {
    try {
        const { userId } = req.user;
        const { propertyId } = req.body;

        if (!propertyId) {
            return res.status(400).json({ success: false, message: "Property ID is required" });
        }


        const property = await propertyModel.findOne({ _id: propertyId, userId });
        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found or unauthorized" });
        }
        await propertyModel.findByIdAndDelete(propertyId);

        res.status(200).json({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const hostListBooking = async (req, res) => {
    try {
        const { userId } = req.user;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Host not found" });
        }

        // Find bookings for properties created by the host
        const bookedProperties = await bookingModel.find({
            propertyId: {
                $in: await propertyModel.find({ userId }).select('_id')
            }
        })
            .populate('propertyId', 'name image location price distance title')
            .populate('userId', 'name email');

        res.status(200).json({ success: true, bookedProperties });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const cancelBookings = async (req, res) => {
    try {

        const { bookingId } = req.body

        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (booking.cancelled || booking.isCompleted) {
            return res.status(400).json({ success: false, message: "This booking cannot be cancelled." });
        }

        booking.cancelled = true;
        await booking.save();
        return res.status(200).json({ success: true, message: "Booking cancelled successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const completeBooking = async (req, res) => {
    try {

        const { bookingId } = req.body

        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (booking.cancelled || booking.isCompleted) {
            return res.status(400).json({ success: false, message: "This booking cannot be cancelled." });
        }

        booking.isCompleted = true;
        await booking.save();
        return res.status(200).json({ success: true, message: "Booking Completed successfully." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}



export { addProperty, allProperties, availabilityChangeByHost, deleteProperty, hostListBooking, cancelBookings, completeBooking }