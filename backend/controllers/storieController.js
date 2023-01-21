const asyncHandler = require('express-async-handler')

const Storie = require('../models/storieModel')
const User = require('../models/userModel')


const getStories = asyncHandler(async (req, res) => {
  const stories = await Storie.find({ user: req.user.id })

  res.status(200).json(stories)
})


const setStorie = asyncHandler(async (req, res) => {
  if (!req.body.titre) {
    res.status(400)
    throw new Error('Please add a titre ')
  }
  if (!req.body.description) {
    res.status(400)
    throw new Error('Please add a description ')
  }
  if (!req.body.duree) {
    res.status(400)
    throw new Error('Please add a duree ')
  }
  if (!req.body.couleur) {
    res.status(400)
    throw new Error('Please add a couleur ')
  }
  if (!req.body.code) {
    res.status(400)
    throw new Error('Please add a Code ')
  }

  const storieu = await Storie.create({
    titre: req.body.titre,
    description: req.body.description,
    duree: req.body.duree,
    couleur: req.body.couleur,
    code: req.body.code,
    day: 0,
    user: req.user.id,
    
  })

  res.status(200).json(storieu)
})


const updateStorie = asyncHandler(async (req, res) => {
  const storie = await Storie.findById(req.params.id)

  if (!storie) {
    res.status(400)
    throw new Error('Storie not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  
  if (storie.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedStorie = await Storie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedStorie)
})
//----------
const updatepos = asyncHandler(async (req, res) => {
  const storyIds = req.params.id;
  const day = req.params.day;
  const idArray = storyIds.split("-");


  idArray.forEach(id => {
    // Update the story with the corresponding id
    Storie.findByIdAndUpdate(id, { day: day }, (err,storie) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
});
res.send("Stories updated successfully.");
});



const deleteStorie = asyncHandler(async (req, res) => {
  const storie = await Storie.findById(req.params.id)

  if (!storie) {
    res.status(400)
    throw new Error('storie not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  
  if (storie.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await storie.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getStories,
  setStorie,
  updateStorie,
  deleteStorie,
  updatepos
}