// include all of your models here using CommonJS requires
const User = require("./User.js")
const Event = require('./Event.js')
const EventType = require('./EventType.js')
const Game = require('./games/Game.js')
const GameImage = require('./games/GameImage.js')
const GameVideo = require('./games/GameVideo.js')
const GamePlatform = require('./games/GamePlatform.js')
const Platform = require('./games/Platform.js')
const GameGenre = require('./games/GameGenre.js')
const Genre = require('./games/Genre.js')
const Interest = require('./Interest.js')
const StudyTopic = require('./StudyTopic.js')

module.exports = { User, Event, EventType, Game, GameImage, GameVideo, GamePlatform, Platform, GameGenre, Genre, Interest, StudyTopic }
