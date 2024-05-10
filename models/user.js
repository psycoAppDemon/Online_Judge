import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type:String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
    userId:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    submission: {
        type: String
        // type: [{
        //     type: mongoose.Schema.Types.Object,
        //     ref: 'submsubmissionSchema',
        // }] 
    },
});

const User = mongoose.model('User', userSchema);

export { User };