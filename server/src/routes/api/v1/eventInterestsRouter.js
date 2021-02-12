import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Interest } from '../../../models/index.js'
import InterestSerializer from '../../../serializers/InterestSerializer.js'

const eventInterestsRouter = new express.Router({ mergeParams: true })

eventInterestsRouter.post('/', async (req, res) => {
  const { value } = req.body
  const { eventId } = req.params
  const userId = req.user.id

  try {
    const newInterest = await Interest.query()
      .insert({ eventId, userId, value })
      .returning('*')
    const serializedInterest = await InterestSerializer.getOne(newInterest)
    const totalAttending = await Interest.query()
      .where('eventId', eventId)
      .andWhere('value', 'attending')
      .count({ value: 'value' })
      .first()
    const totalInterested = await Interest.query()
      .where('eventId', eventId)
      .andWhere('value', 'interested')
      .count({ value: 'value' })
      .first()
    return res.status(201).json({ interest: serializedInterest, totalAttending: totalAttending, totalInterested: totalInterested })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

eventInterestsRouter.patch('/', async (req, res) => {
  const { value } = req.body
  const { eventId } = req.params
  const userId = req.user.id

  try {
    const editedInterest = await Interest.query()
      .findOne({ eventId, userId })
      .update({ value: value })
      .returning('*')
    const serializedInterest = await InterestSerializer.getOne(editedInterest)
    const totalAttending = await Interest.query()
      .where('eventId', eventId)
      .andWhere('value', 'attending')
      .count({ value: 'value' })
      .first()
    const totalInterested = await Interest.query()
      .where('eventId', eventId)
      .andWhere('value', 'interested')
      .count({ value: 'value' })
      .first()
    return res.status(201).json({ interest: serializedInterest, totalAttending: totalAttending, totalInterested: totalInterested })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

eventInterestsRouter.delete('/', async (req, res) => {
  const { eventId } = req.params
  const userId = req.user.id

  try {
    await Interest.query()
      .findOne({ eventId, userId })
      .delete()
      const totalAttending = await Interest.query()
      .where('eventId', eventId)
      .andWhere('value', 'attending')
      .count({ value: 'value' })
      .first()
    const totalInterested = await Interest.query()
      .where('eventId', eventId)
      .andWhere('value', 'interested')
      .count({ value: 'value' })
      .first()
    return res.status(201).json({ totalAttending: totalAttending, totalInterested: totalInterested })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default eventInterestsRouter
