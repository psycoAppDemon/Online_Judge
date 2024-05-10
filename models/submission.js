import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    problemId:{
        type: String,
        required: true,
        trim: true
    },
    submissionTime:{
        type: Date,
        default: Date.now
    },
    userId:{
        type: String,
        required: true,
        trim: true,
    },
    verdict:{
        type: String,
        default : 'Unattempted'
    }
    
});

module.exports = mongoose.model("submission", submissionSchema);