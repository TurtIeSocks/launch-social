import express from "express"

import { Event } from '../../../models/index.js'
import EventSerializer from "../../../serializers/EventSerializer.js"

const homepageRouter = new express.Router()

homepageRouter.get("/:page", async (req, res) => {
  try {
    const currentDate = (new Date).getTime()
    const events = await Event.query()
      .where('endDate', '>', currentDate)
      .page(req.params.page-1, 10)
      .orderBy(['startDate', 'endDate'])
    const serializedEvents = await EventSerializer.getAll(events.results)
    const stats = await EventSerializer.getStats()
    res.status(200).json({ total: events.total, events: serializedEvents, stats: stats })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

homepageRouter.get("/game/:id/:page", async (req, res) => {
  try {
    const currentDate = (new Date).getTime()
    const events = await Event.query()
      .where('gameId', req.params.id)
      .andWhere('endDate', '>', currentDate)
      .page(req.params.page-1, 10)
      .orderBy(['startDate', 'endDate'])
    const serializedEvents = await EventSerializer.getAll(events.results)
    const stats = await EventSerializer.getStats()
    res.status(200).json({ total: events.total, events: serializedEvents, stats: stats })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

homepageRouter.get("/studyTopic/:topic/:page", async (req, res) => {
  try {
    const currentDate = (new Date).getTime()
    const events = await Event.query()
      .where('studyTopicId', req.params.topic)
      .andWhere('endDate', '>', currentDate)
      .page(req.params.page-1, 10)
      .orderBy(['startDate', 'endDate'])
    const serializedEvents = await EventSerializer.getAll(events.results)
    const stats = await EventSerializer.getStats()
    res.status(200).json({ total: events.total, events: serializedEvents, stats: stats })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default homepageRouter