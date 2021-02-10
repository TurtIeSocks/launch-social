import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Event, Year, Month, EventType } from '../../../models/index.js'
import cleanUserInput from "../../../services/cleanUserInput.js"

const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await Event.query()
    const years = await Year.query()
    const months = await Month.query()
    const eventTypes = await EventType.query()
    res.status(200).json({ events: events, months: months, years: years, eventTypes: eventTypes })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

eventsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    let { eventTypeId } = formInput
    const { name, description, location, url, meetUrl, imageUrl, gameName, maxPlayers, studyTopic, otherType, yearId, monthId, day, hour, minute, duration, repeats, alerts } = formInput
    const userId = req.user.id

    if (otherType) {
      let newType = await EventType.query()
        .insert({ name: otherType })
        .returning('*')
      eventTypeId = newType.id
    }

    const newEvent = await Event.query()
      .insert({ userId, name, description, location, url, meetUrl, imageUrl, eventTypeId, gameName, maxPlayers, studyTopic, yearId, monthId, day, hour, minute, duration, repeats, alerts })
      .returning('*')
    return res.status(201).json({ newEvent: newEvent })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

export default eventsRouter
