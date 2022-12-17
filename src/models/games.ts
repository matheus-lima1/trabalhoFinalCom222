import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    require: true,
  },
  resumo: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  genero: {
    type: String,
    require: true,
    select: false,
  },
  desenvolvedor: {
    type: String,
    require: true,
    select: false,
  },
  console: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Game", gameSchema);

