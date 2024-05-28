import mongoose from "mongoose";

const testcaseSchema = new mongoose.Schema({
    problemId:{
        type: String,
        required: true,
        trim: true
    },
    input:{
        type: String,
        required: true,
        trim: true
    },
    output:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        enum: ["sample", "hidden"],
        default: "sample",
    }
});

const testcase = mongoose.model("testcase", testcaseSchema);

export { testcase };