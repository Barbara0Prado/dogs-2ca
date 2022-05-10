const router = require('express').Router()
const { json } = require('express/lib/response')
const Dog = require('../models/Dog')

//Creating Data
router.post('/', async (req, res) => {

  const {name, age, weight, approved} = req.body

  if (!name) {
    res.status(422).json({error: 'Name is requested!'})
    return
  }

  const dog = {
    name, 
    age,
    weight,
    approved
  }

  try {
    //Creating data
    await Dog.create(dog)

    res.status(201).json({message: 'Dog created into the system successfully!'})
    
  } catch (error) {
    res.status(500).json({error: error})
  }

})

//Reading Data
router.get('/', async (req, res) => {

  try {

    const dogs = await Dog.find()

    res.status(200).json(dogs) 

  } catch (error) {
    res.status(500).json({error: error})
  }

})

router.get('/:id', async (req, res) => {

  //Extracting data from the request
  const id = req.params.id

  try {

    const dog = await Dog.findOne({_id: id })

    if (!dog) {
      res.status(422).json({message: 'The dog was not found!'})
      return
    }

    res.status(200).json(dog)
    
  } catch (error) {
    res.status(500).json({error: error})
  }

})

//Updating data

router.patch('/:id', async (req, res) => {

  const id = req.params.id

  const {name, age, weight, approved} = req.body

  const dog = {
    name,
    age,
    weight,
    approved,
  }

  try {

    const updatedDog = await Dog.updateOne({_id: id}, dog)

    if(updatedDog.matchedCount === 0) {
      res.status(422).json({message: 'The dog was not found!'})
      return
    }

    res.status(200).json(dog)
    
  } catch (error) {
    res.status(500).json({error: error})
  }

}) 

//Delete Data
router.delete('/:id', async (req, res) => {

  const id = req.params.id

  const dog = await Dog.findOne({_id: id})

  if (!dog) {

    res.status(422).json({message: 'The dog was not found!'})
    return
  }

  try {
    
    await Dog.deleteOne({_id: id})

    res.status(200).json({message: 'Dog deleted successfully!'})

  } catch (error) {
    res.status(500).json({error: error})
    
  }

})

module.exports = router