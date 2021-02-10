import express from "express"

import { Year, Month, EventType } from '../../../models/index.js'

const basicsRouter = new express.Router()

basicsRouter.get("/", async (req, res) => {
  try {
    const years = await Year.query()
    const months = await Month.query()
    const eventTypes = await EventType.query()
    res.status(200).json({ months: months, years: years, eventTypes: eventTypes })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default basicsRouter