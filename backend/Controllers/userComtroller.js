import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../Models/userModel.js"
import jwt from "jsonwebtoken"
import propertyModel from "../Models/propertyModel.js";
import bookingModel from "../Models/bookingModel.js";

// Api for register user

const registerUser = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;

        // Validate required fields
        if (!name || !email || !role || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a valid email" });
        }

        // Fix password length check (should be at least 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }

        // Hash password and save user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = { name, email, role, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Generate token
        let token;
        if (role === "host") {
            token = jwt.sign({ id: user._id, role: "host" }, process.env.JWT_SECRET_HOST);
        } else if (role === "guest") {
            token = jwt.sign({ id: user._id, role: "guest" }, process.env.JWT_SECRET_GUEST);
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        res.status(200).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        let token;
        if (user.role === 'host') {
            token = jwt.sign({ id: user._id, role: 'host' }, process.env.JWT_SECRET_HOST)
        } else if (user.role === 'guest') {
            token = jwt.sign({ id: user._id, role: 'guest' }, process.env.JWT_SECRET_GUEST)
        } else {
            return res.status(400).json({ success: false, message: "Invalid role" });
        }

        res.status(200).json({ success: true, token, user })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

const bookProperty = async (req, res) => {
    try {
        const { propertyId, checkin, checkout, guest, totalPrice } = req.body;

        // Use the userId from the token
        const userId = req.user.userId;

        if (!propertyId || !userId || !checkin || !checkout || !guest || !totalPrice) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (checkinDate >= checkoutDate) {
            return res.status(400).json({ message: "Check-in date must be before check-out date." });
        }

        // Check if the property is already booked for the requested dates
        const existingBooking = await bookingModel.findOne({
            propertyId,
            $or: [
                {
                    checkin: { $lt: checkoutDate },
                    checkout: { $gt: checkinDate }
                }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ success: false, message: "Property is already booked for the selected dates." });
        }

        // Create a new booking
        const booking = new bookingModel({
            propertyId,
            userId,
            checkin: checkinDate,
            checkout: checkoutDate,
            guest,
            totalPrice,
            date: Date.now(),
        });

        await booking.save();

        return res.status(200).json({ success: true, message: "Property Booked Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const listBookings = async (req, res) => {
    try {
        // Use the userId from the authenticated token
        const userId = req.user.userId;

        // Find the user to ensure they exist
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found." });
        }

        // Fetch bookings for the authenticated user and populate property and user detail
        const bookings = await bookingModel
            .find({ userId })
            .populate('propertyId', 'name image location price distance') // Specify fields to fetch from the propertyModel
            .populate('userId', 'name email'); // Specify fields to fetch from the userModel

        // Check if there are no bookings
        if (bookings.length === 0) {
            return res.status(404).json({ success: false, message: "No bookings found for this user." });
        }

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;  // Ensure bookingId is correctly received

        // Find the booking by its ID
        const booking = await bookingModel.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        // Check if the booking is already cancelled or completed
        if (booking.cancelled || booking.isCompleted) {
            return res.status(400).json({ success: false, message: "This booking cannot be cancelled." });
        }

        // Mark the booking as cancelled
        booking.cancelled = true;
        await booking.save();

        return res.status(200).json({ success: true, message: "Booking cancelled successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};






export { registerUser, loginUser, bookProperty, listBookings, cancelBooking }



