import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Event, EventType, StudyTopic, Game, GameImage, GamePlatform, GameVideo, Platform, GameGenre, Genre } from '../../../models/index.js'
import EventSerializer from "../../../serializers/EventSerializer.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import eventInterestsRouter from './eventInterestsRouter.js'

const eventsRouter = new express.Router()

eventsRouter.get("/", async (req, res) => {
  try {
    const currentDate = (new Date).getTime()
    const events = await Event.query()
      .where('endDate', '>', currentDate)
      .orderBy(['startDate', 'endDate'])
    const serializedEvents = await EventSerializer.getAll(events)
    const stats = await EventSerializer.getStats()
    res.status(200).json({ events: serializedEvents, stats: stats })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

eventsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.query().findById(id)
    const serializedEvent = await EventSerializer.getOne(event)
    res.status(200).json({ event: serializedEvent })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

eventsRouter.post("/", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    let { eventTypeId } = formInput
    const { name, description, location, meetUrl, gameDetails, studyTopic, imageUrl, otherType, startDate, endDate, repeats, alerts } = formInput
    const userId = req.user.id

    if (otherType) {
      let newType = await EventType.query()
        .insert({ name: otherType })
        .returning('*')
      eventTypeId = newType.id
    }

    let studyTopicId
    if (studyTopic && studyTopic.__isNew__) {
      let newStudyTopic = await StudyTopic.query()
        .insert({ name: studyTopicId.label, imageUrl })
        .returning('*')
      studyTopicId = newStudyTopic.id
    } else if (studyTopic) {
      studyTopicId = studyTopic.value
    }

    let gameId
    if (gameDetails && gameDetails.id !== 0) {
      const checkIfGameExists = await Game.query().findOne({ apiId: gameDetails.id })
      if (!checkIfGameExists) {
        let { id, name, cover, multiplayer_modes, platforms, genres, screenshots, summary, url, videos } = gameDetails
        if (!multiplayer_modes) multiplayer_modes = [{ onlinemax: 1 }]

        const newGame = await Game.query()
          .insert({ apiId: id, name: name, summary: summary, maxPlayers: multiplayer_modes[0].onlinemax, coverArt: cover.image_id, url: url })
          .returning('*')
        gameId = newGame.id

        if (screenshots) {
          for (const image of screenshots) {
            await GameImage.query().insert({ imageId: image.image_id, gameId })
          }
        }

        if (videos) {
          for (const video of videos) {
            await GameVideo.query().insert({ videoId: video.video_id, gameId })
          }
        }

        if (platforms) {
          let platformId
          for (const platform of platforms) {
            const checkIfPlatformExists = await Platform.query().findOne({ apiId: platform.id })
            if (!checkIfPlatformExists) {
              const apiId = platform.id
              const name = platform.name ? platform.name : null
              const imageId = platform.platform_logo ? platform.platform_logo.image_id : null
              const newPlatform = await Platform.query()
                .insert({ apiId, name, imageId })
                .returning('*')
              platformId = newPlatform.id
            } else {
              platformId = checkIfPlatformExists.id
            }
            await GamePlatform.query().insert({ gameId, platformId })
          }
        }

        if (genres) {
          let genreId
          for (const genre of genres) {
            const checkIfGenreExists = await Genre.query().findOne({ apiId: genre.id })
            if (!checkIfGenreExists) {
              const apiId = genre.id
              const name = genre.name ? genre.name : null
              const newGenre = await Genre.query()
                .insert({ apiId, name })
                .returning('*')
              genreId = newGenre.id
            } else {
              genreId = checkIfGenreExists.id
            }
            await GameGenre.query().insert({ gameId, genreId })
          }
        }

      } else {
        gameId = checkIfGameExists.id
      }
    }

    await Event.query()
      .insert({ userId, name, description, location, meetUrl, eventTypeId, gameId, studyTopicId, startDate, endDate, repeats, alerts })
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

eventsRouter.patch("/:id", async (req, res) => {
  try {
    const { body } = req
    const formInput = cleanUserInput(body)
    let { eventTypeId, gameId, startDate, endDate } = formInput
    const { name, description, location, meetUrl, gameDetails, studyTopic, imageUrl, otherType, repeats, alerts } = formInput
    const userId = req.user.id
    const { id } = req.params

    if (otherType) {
      let newType = await EventType.query()
        .insert({ name: otherType })
        .returning('*')
      eventTypeId = newType.id
    }

    let studyTopicId
    if (studyTopic && studyTopic.__isNew__) {
      let newStudyTopic = await StudyTopic.query()
        .insert({ name: studyTopicId.label, imageUrl })
        .returning('*')
      studyTopicId = newStudyTopic.id
    } else if (studyTopic) {
      studyTopicId = studyTopic.value
    }

    if (typeof startDate === 'string') {
      let start = new Date(startDate)
      startDate = start.getTime()
      let end = new Date(endDate)
      endDate = end.getTime()
    }

    if (gameDetails && gameDetails.id !== 0) {
      const checkIfGameAlreadyExists = await Game.query().findOne({ apiId: gameDetails.apiId })
      if (!checkIfGameAlreadyExists) {
        let { id, name, cover, multiplayer_modes, platforms, screenshots, summary, url, videos } = gameDetails
        if (!multiplayer_modes) multiplayer_modes = [{ onlinemax: 1 }]

        const newGame = await Game.query()
          .insert({ apiId: id, name: name, summary: summary, maxPlayers: multiplayer_modes[0].onlinemax, coverArt: cover.image_id, url: url })
          .returning('*')
        gameId = newGame.id

        if (screenshots) {
          for (const image of screenshots) {
            await GameImage.query().insert({ imageId: image.image_id, gameId })
          }
        }
        if (videos) {
          for (const video of videos) {
            await GameVideo.query().insert({ videoId: video.video_id, gameId })
          }
        }
        if (platforms) {
          for (const platform of platforms) {
            let name = platform.name ? platform.name : null
            let imageId = platform.platform_logo ? platform.platform_logo.image_id : null
            await GamePlatform.query().insert({ name, imageId, gameId })
          }
        }
      } else {
        gameId = checkIfGameAlreadyExists.id
      }
    }

    await Event.query()
      .findById(id)
      .update({ userId, name, description, location, meetUrl, eventTypeId, gameId, studyTopicId, startDate, endDate, repeats, alerts })
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

eventsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    await Event.query()
      .findById(id)
      .delete()
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error })
  }
})

eventsRouter.use('/:eventId/interests', eventInterestsRouter)

export default eventsRouter
