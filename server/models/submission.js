import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    problemId:{
        type: String,
        required: true,
        trim: true
    },
    codefilepath:{
        type: String,
        required: true,
    },
    language:{
        type: String,
        required: true,
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
const submission = mongoose.model("submission", submissionSchema);

export { submission };