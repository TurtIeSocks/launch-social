import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Event, EventType, Game, GameImage, GamePlatform, GameVideo } from '../../../models/index.js'
import cleanUserInput from "../../../services/cleanUserInput.js"

const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await Event.query()
    res.status(200).json({ events: events })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

eventsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    let { eventTypeId } = formInput
    const { name, description, location, url, meetUrl, imageUrl, gameDetails, studyTopic, otherType, yearId, monthId, day, hour, minute, duration, repeats, alerts } = formInput
    const userId = req.user.id

    if (otherType) {
      let newType = await EventType.query()
        .insert({ name: otherType })
        .returning('*')
      eventTypeId = newType.id
    }

    let gameId
    if (gameDetails) {
      
      const { id, name, cover, multiplayer_modes, platforms, screenshots, summary, url, videos } = gameDetails
      
      let newGame = await Game.query()
        .insert({ apiId: id, name: name, summary: summary, maxPlayers: multiplayer_modes[0].onlinemax, coverArt: cover.image_id, url: url })
        .returning('*')
      gameId = newGame.id
      for (const image of screenshots) {
        await GameImage.query().insert({ imageId: image.image_id, gameId })
      }
      for (const video of videos) {
        await GameVideo.query().insert({ videoId: video.video_id, gameId })
      }
      for (const platform of platforms) {
        await GamePlatform.query().insert({ name: platform.name, imageId: platform.platform_logo.image_id, gameId })
      }
    }

    const newEvent = await Event.query()
      .insert({ userId, name, description, location, url, meetUrl, imageUrl, eventTypeId, gameId, studyTopic, yearId, monthId, day, hour, minute, duration, repeats, alerts })
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
