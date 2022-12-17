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
  },
  desenvolvedor: {
    type: String,
    require: true,
  },
  console: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Game", gameSchema);

