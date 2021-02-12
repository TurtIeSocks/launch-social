import express from "express"

import { Year, Month, EventType } from '../../../models/index.js'
import EventTypeSerializer from "../../../serializers/EventTypeSerializer.js"
import MonthSerializer from "../../../serializers/MonthSerializer.js"
import YearSerializer from "../../../serializers/YearSerializer.js"

const basicsRouter = new express.Router()

basicsRouter.get("/", async (req, res) => {
  try {
    const years = await Year.query()
    const serializedYears = await YearSerializer.getAll(years)
    const months = await Month.query()
    const serializedMonths = await MonthSerializer.getAll(months)
    const eventTypes = await EventType.query()
    const serializedEventTypes = await EventTypeSerializer.getAll(eventTypes)

    res.status(200).json({ years: serializedYears, months: serializedMonths, eventTypes: serializedEventTypes })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default basicsRouter