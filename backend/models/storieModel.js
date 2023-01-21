const mongoose = require('mongoose')

const storieSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    titre: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    duree: {
      type: Number,
      required: [true, 'Please add a duree'],
    },
    couleur: {
      type: String,
      required: [true, 'Please add a couleur'],
    },
    code: {
      type: String,
      required: [true, 'Please add a Code'],
    },
    day: {
      type: Number,
      required: [true, 'Please add a Code'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Storie', storieSchema)