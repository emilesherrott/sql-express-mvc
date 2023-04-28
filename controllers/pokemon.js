const Pokemon = require("../models/Pokemon")

const index = async (req, res) => {
  try {
    console.log("hit")
    const pokemon = await Pokemon.getAll()
    res.status(200).json({
      success: true,
      pokemon: pokemon,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive Pokemon",
      error: err,
    })
  }
}

const show = async (req, res) => {
  try {
    const idx = parseInt(req.params.id)
    const pokemon = await Pokemon.getOne(idx)
    res.status(200).json({
      success: true,
      pokemon: pokemon,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Unable to retrieve Pokemon",
      error: err,
    })
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const pokemon = await Pokemon.create(data)
    res.status(201).json({
      success: true,
      pokemon: pokemon
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Unable to create Pokemon",
      error: err,
    })
  }
}

const update = async (req, res) => {
  try {
    const idx = parseInt(req.params.id)
    const data = req.body
    const pokemon = await Pokemon.getOne(idx)
    const result = await pokemon.update(data)
    res.status(200).json({
        success: true,
        pokemon: result
    })

  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Unable to update Pokemon",
      error: err,
    })
  }
}



const destroy = async (req, res) => {
    try {
        const idx = parseInt(req.params.id)
        const pokemon = await Pokemon.getOne(idx)
        const result = await pokemon.destory()
        res.status(204).json({
            success: true,
            message: "Pokemon deleted"
          })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Unable to delete Pokemon",
            error: err,
          })
    }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}
