
import Igdb from "../../../apiClient/Igdb.js"
import express from 'express'

const gameRouter = new express.Router()

gameRouter.get("/names", async (req, res) => {
  const { search } = req.query
  try {
    console.log(JSON.stringify(search))
    
    const response = await Igdb.getGames(search)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default gameRouter