import { Event, Game, StudyTopic, User } from "../../models/index.js"

class EventSeeder {
  static async seed() {

    const userCount = await User.query().count('id as value').first()
    const gameCount = await Game.query().count('id as value').first()
    const studyCount = await StudyTopic.query().count('id as value').first()

    const rng = (base, range) => {
      return Math.floor(Math.random() * range + base)
    }

    const timeGenerator = () => {
      const eventLength = rng(0, 2)
      const start = rng((new Date).getTime(), 5097600000)
      const end = eventLength ? rng(start, 5097600000) : rng(start, 43200000)

      return { start, end }
    }

    const nameGenerator = (eventType, name) => {
      const gameEvent = [
        name, `Let's Play ${name}`, `I Love ${name}, Let's Try it Out!`, `This ${name} is so Much Fun!`, `${name} is Super Fun!`, `${name} and Chill?`, `Game Night!`, `Streaming ${name}`
      ]
      const studyEvent = [
        name, `Let's Study ${name}`, `Anyone Down to Study ${name}?`, `Going to be Studying ${name} Today if Anyone Wants to Join`, `${name} is Confusing, Study Session?`, `Please HELP Me Study ${name}`, `Study Party!`, `System Check Review`
      ]

      return eventType ? gameEvent[rng(0, gameEvent.length)] : studyEvent[rng(0, studyEvent.length)]
    }

    const descriptionGenerator = (eventType, details) => {
      const genres = eventType ? details.genres.map(genre => genre.name) : []
      const platforms = eventType ? details.platforms.map(platform => platform.name) : []
      const gameEvent = [
        `Playing ${details.name} if anyone is looking to join. It supports up to ${details.maxPlayers}${details.maxPlayers === 1 ? '' : 's'} and is a lot of fun!`, `Planning to play ${details.name} tonight, you can check out more info about the game at ${details.url} if you're interested.`, `I just got this awesome new game, please play it with me! It supports up to ${details.maxPlayers}${details.maxPlayers === 1 ? '' : 's'}`, `Looking for some ${details.name} buddies, anyone else looking to play?`, `Let's Play ${details.name} to Calm Ourselves After that System Check`, `Do you like ${genres.join(', ')}? Own a ${platforms.join(', ')}? Then you'll like ${details.name}.`
      ]
      const studyEvent = [
        `Come study ${details.name} with me!`, `Studying ${details.name} for the System Check Tomorrow.`, `Going to be studying ${details.name} in the 24/7 Zoom if anyone is interested in joining.`, `Those who study ${details.name} together... pass...together?`, `Really need some help on ${details.name} if anyone is around!`
      ]

      return eventType ? gameEvent[rng(0, gameEvent.length)] : studyEvent[rng(0, studyEvent.length)]
    }

    for (let i = 1; i < parseInt(userCount.value); i++) {
      const numEvents = rng(1, 10)

      for (let j = 0; j < numEvents; j++) {
        const dates = timeGenerator()
        const meetUrl = rng(0, 2)
        const eventType = rng(0, 2)
        const details = eventType ?
          await Game.query().findById(rng(1, parseInt(gameCount.value))) :
          await StudyTopic.query().findById(rng(1, parseInt(studyCount.value)))

        if (eventType) {
          details.genres = await details.$relatedQuery('gameGenres')
          details.platforms = await details.$relatedQuery('gamePlatforms')
        }

        await Event.query().insert({
          userId: i,
          name: nameGenerator(eventType, details.name),
          description: descriptionGenerator(eventType, details),
          location: rng(0, 2) ? 'Deck 7' : 'Virtual',
          meetUrl: meetUrl ? 'https://www.zoom.com' : 'https://hangouts.google.com/',
          eventTypeId: eventType ? 1 : 2,
          studyTopicId: eventType ? null : details.id,
          gameId: eventType ? details.id : null,
          startDate: dates.start,
          endDate: dates.end,
          repeats: false,
          alerts: false
        })
      }
    }
  }
}

export default EventSeeder
