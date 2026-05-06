import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        address: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true,
    }
);

export default mongoose.model("Contacts", contactSchema )