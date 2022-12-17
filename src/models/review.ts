import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({

  titulo: {
    type: String,
    require: true,
  },
  nota: {
    type: Number,
    require: true,
  },
  texto: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Review", reviewSchema);

