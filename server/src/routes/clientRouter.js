import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

const clientRoutes = [
  "/",
  "/events/:id",
  "/user-profile",
  "/auth/github",
  "/new-event",
  "/events/:id/edit",
  "/events/:id/delete",
  "/game/:id",
  "/studyTopic/:id"
]
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
