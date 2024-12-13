
import propertyModel from "../Models/propertyModel.js";


// Api for change availability for admin panel
const changeAvailability = async (req, res) => {
    try {

        const { propertyId } = req.body
        const propertyData = await propertyModel.findById(propertyId)
        await propertyModel.findByIdAndUpdate(propertyId, { availability: !propertyData.availability })
        res.json({ success: true, message: "Availability changed" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


// Api to get All properties data for frontend
const propertyList = async (req, res) => {
    try {

        const properties = await propertyModel.find({})
        res.status(200).json({ success: true, properties })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


export { changeAvailability, propertyList }