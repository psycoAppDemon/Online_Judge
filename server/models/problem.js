import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
    trim: true,
  },
  problemStatement: {
    type: String,
    required: true,
    trim: true,
  },
  constraints:{
    type: String,
    trim: true,
  },
  IOformatDescription:{
    type: String,
    trim: true,
  },
  testcaseList: {
    type: [
      {
        type: mongoose.Schema.Types.Object,
        ref: "testcaseSchema",
      },
    ],
  },
});

const problem = mongoose.model("problem", problemSchema);

export { problem };
