const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email: " + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(val) {
            if (!validator.isStrongPassword(val, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                throw new Error("Weak password: " + val);
            }
        }
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    gender: {
        type: String,
        required: false,
        lowercase: true,
        trim: true,
        validate(val) {
            if (!["male", "female", "other"].includes(val)) {
                throw new Error("Invalid gender: " + val);
            }
        }
    },
    about: {
        type: String,
        maxLength: 50
    },
    photo: {
        type: String,
        required: false,
        default: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1740779693~exp=1740783293~hmac=3ffc11733917c931bddeec957e8fa649e6a1590282b3210d816ccbf54dab2e94&w=900",
        validate(val) {
            if (val && !validator.isURL(val)) {
                throw new Error("Invalid photo URL: " + val);
            }
        }
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
