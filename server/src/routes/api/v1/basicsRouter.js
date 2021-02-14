import express from "express"

import { EventType } from '../../../models/index.js'
import EventTypeSerializer from "../../../serializers/EventTypeSerializer.js"

const basicsRouter = new express.Router()

basicsRouter.get("/", async (req, res) => {
  try {
    const eventTypes = await EventType.query()
    const serializedEventTypes = await EventTypeSerializer.getAll(eventTypes)
    res.status(200).json({ eventTypes: serializedEventTypes })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default basicsRouter