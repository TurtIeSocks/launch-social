import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Comment } from '../../../models/index.js'
import CommentSerializer from '../../../serializers/CommentSerializer.js'

const eventCommentsRouter = new express.Router({ mergeParams: true })

eventCommentsRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const comment = await Comment.query().findById(id)
    const serializedComment = await CommentSerializer.getOne(comment)
    res.status(200).json({ comment: serializedComment })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

eventCommentsRouter.post('/', async (req, res) => {
  const { comment } = req.body
  const { eventId } = req.params
  const userId = req.user.id

  try {
    const newComment = await Comment.query()
      .insert({ eventId, userId, comment })
      .returning('*')
    const serializedComment = await CommentSerializer.getOne(newComment)
    return res.status(201).json({ comment: serializedComment })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

eventCommentsRouter.patch('/:id', async (req, res) => {
  const { comment } = req.body
  const { id } = req.params

  try {
    const editedComment = await Comment.query()
      .findById(id)
      .update({ comment: comment })
      .returning('*')
    const serializedComment = await CommentSerializer.getOne(editedComment)
    return res.status(201).json({ comment: serializedComment })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

eventCommentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Comment.query()
      .findById(id)
      .delete()
    return res.status(201).json()
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default eventCommentsRouter
