import express from "express"

import { EventType, StudyTopic } from '../../../models/index.js'
import EventTypeSerializer from "../../../serializers/EventTypeSerializer.js"
import StudyTopicSerializer from '../../../serializers/StudyTopicSerializer.js'

const basicsRouter = new express.Router()

basicsRouter.get("/", async (req, res) => {
  try {
    const eventTypes = await EventType.query()
    const serializedEventTypes = await EventTypeSerializer.getAll(eventTypes)

    const topics = await StudyTopic.query()
    const serializedTopics = await StudyTopicSerializer.getAll(topics)
    
    res.status(200).json({ eventTypes: serializedEventTypes, studyTopics: serializedTopics })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

export default basicsRouter