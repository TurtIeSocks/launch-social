// include all of your models here using CommonJS requires
const User = require("./User.js")
const Month = require('./Month.js')
const Year = require('./Year.js')
const Event = require('./Event.js')
const EventType = require('./EventType.js')
const Game = require('./games/Game.js')
const GameImage = require('./games/GameImage.js')
const GameVideo = require('./games/GameVideo.js')
const GamePlatform = require('./games/GamePlatform.js')
const Interest = require('./Interest.js')

module.exports = { User, Month, Year, Event, EventType, Game, GameImage, GameVideo, GamePlatform, Interest };
