const db = require("../database/connect")

class Pokemon {
  constructor({ pokemon_id, name, number, level, type, caught, owner }) {
    this.id = pokemon_id
    this.name = name
    this.number = number
    this.level = level
    this.type = type
    this.caught = caught
    this.owner = owner
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM pokemon;")
    if (!response.rows.length) {
      throw new Error("No Pokemon found")
    }
    return response.rows.map((pokemon) => new Pokemon(pokemon))
  }

  static async getOne(id) {
    const response = await db.query("SELECT * FROM pokemon WHERE pokemon_id = $1;", [id])
    if (response.rows.length != 1) {
      throw new Error("No Pokemon found")
    }
    console.log(response.rows[0])
    return new Pokemon(response.rows[0])
  }

  static async create(data) {
    const { name, number, level, type, caught, owner } = data
    const response = await db.query("INSERT INTO pokemon (name, number, level, type, caught, owner) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [name, number, level, type, caught, owner])
    const pokemonId = response.rows[0].pokemon_id
    const newPokemon = await Pokemon.getOne(pokemonId)
    return newPokemon
  }

  async update(data) {
    console.log(data)
    console.log(this)
    const { name, number, level, type, caught, owner } = data
    const response = await db.query("UPDATE pokemon SET (name, number, level, type, caught, owner) = ($1, $2, $3, $4, $5, $6) WHERE pokemon_id = $7 RETURNING *;", [
      name,
      number,
      level,
      type,
      caught,
      owner,
      this.id,
    ])
    console.log("hit")
    if (response.rows.length != 1) {
      throw new Error("Not able to update Pokemon")
    }
    return new Pokemon(response.rows[0])
  }

  async destory() {
    const response = await db.query("DELETE FROM pokemon WHERE pokemon_id = $1 RETURNING *;", [this.id])
    if (response.rows.length != 1) {
      throw new Error("Not able to delete Pokemon")
    }
    return new Pokemon(response.rows[0])
  }
}

module.exports = Pokemon
