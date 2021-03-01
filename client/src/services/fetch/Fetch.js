import fetchAllEvents from './homepage/fetchAllEvents.js'
import fetchRelated from './homepage/fetchRelated.js'

import fetchEvent from './eventShow/fetchEvent.js' 
import newComment from './eventShow/newComment.js'
import fetchComment from './eventShow/fetchComment.js'
import editComment from './eventShow/editComment.js' 
import deleteComment from './eventShow/deleteComment.js' 

import newInterest from './interests/newInterest.js'
import editInterest from './interests/editInterest.js'
import deleteInterest from './interests/deleteInterest.js'

import typesAndTopics from './form/typesAndTopics.js'
import fetchGames from './form/fetchGames.js' 
import newEvent from './form/newEvent.js' 
import fetchEditEvent from './form/fetchEditEvent.js' 
import editEvent from './form/editEvent.js' 
import deleteEvent from './form/deleteEvent.js' 

class Fetch {

  static async fetchAllEvents(page) {
    return fetchAllEvents(page)
  }

  static async fetchRelated(id, page, type) {
    return fetchRelated(id, page, type)
  }

  static async fetchEvent(eventId) {
    return fetchEvent(eventId)
  }

  static async newComment(eventId, commentPayload) {
    return newComment(eventId, commentPayload)
  }

  static async fetchComment(eventId, commentId) {
    return fetchComment(eventId, commentId)
  }

  static async editComment(eventId, commentId, commentPayload) {
    return editComment(eventId, commentId, commentPayload)
  }

  static async deleteComment(eventId, commentId) {
    return deleteComment(eventId, commentId)
  }

  static async newInterest(eventId, interestPayload) {
    return newInterest(eventId, interestPayload)
  }

  static async editInterest(eventId, interestPayload) {
    return editInterest(eventId, interestPayload)
  }

  static async removeInterest(eventId) {
    return deleteInterest(eventId)
  }

  static async typesAndTopics() {
    return typesAndTopics()
  }

  static async fetchGames(inputValue) {
    return fetchGames(inputValue)
  }

  static async newEvent(eventPayload) {
    return newEvent(eventPayload)
  }

  static async fetchEditEvent(eventId) {
    return fetchEditEvent(eventId)
  }

  static async editEvent(eventId) {
    return editEvent(eventId)
  }

  static async deleteEvent(eventId) {
    return deleteEvent(eventId)
  }
}

export default Fetch