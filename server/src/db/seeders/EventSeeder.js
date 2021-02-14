import { Event, User } from "../../models/index.js"

class EventSeeder {
  static async seed() {

    const user1 = await User.query().insert({ githubId: 11111, username: 'admin', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://www.clipartmax.com/png/middle/319-3191274_male-avatar-admin-profile.png' })

    await Event.query().insert({
      userId: user1.id,
      name: 'Solo Gaming Party',
      description: 'Great time playing a controversial game',
      location: 'My Room',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 1,
      studyTopic: '',
      startDate: 1613497380000,
      endDate: 1613515476000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Halo LAN Party Baby',
      description: 'Old school vibes. Halo LAN party, yeah!',
      location: 'Launch Pad',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 2,
      studyTopic: '',
      startDate: 1614293370000,
      endDate: 1614311370000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'A Holiday Trip to an Island Far Far Away',
      description: 'Come enjoy a relaxing evening on a boutique island with your favorite animal friends.',
      location: 'Nook Island',
      meetUrl: 'https://www.googlemeetup.com',
      eventTypeId: 1,
      gameId: 3,
      studyTopic: '',
      startDate: 1614397770000,
      endDate: 1614401370000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Suuuuuuper Maaaaaaaario Bros 2',
      description: 'Old school vibes playing a classic',
      location: '1990',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 4,
      studyTopic: '',
      startDate: 1614444570000,
      endDate: 1614458970000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Come explore the land of Hyrule',
      description: 'Climb mountains, swim across lakes, explore spooky forests, oh boy!',
      location: 'Home',
      meetUrl: 'https://www.googleMeetup.com',
      eventTypeId: 1,
      gameId: 5,
      studyTopic: '',
      startDate: 1614545370000,
      endDate: 1614559770000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'No, YOU\'RE SUS',
      description: 'Online classic',
      location: 'Wherever',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 6,
      studyTopic: '',
      startDate: 1614905370000,
      endDate: 1614916170000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Get Ready To Be Toxic',
      description: 'We\'re getting too comfortable with each other, lets increase the toxicity',
      location: 'Launch Academy',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 7,
      studyTopic: '',
      startDate: 1614995370000,
      endDate: 1615002570000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Lets Beat Up Some Kids',
      description: 'You know you want to',
      location: 'Boston Common',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 8,
      studyTopic: '',
      startDate: 1613497380000,
      endDate: 1615175370000,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Yo, the classic, lets mine some blocks',
      description: 'Bring snacks, it\'s going to be a long night',
      location: 'Mom\'s basement',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 9,
      studyTopic: '',
      startDate: 1615261770000,
      endDate: 1615348170000,
      repeats: false,
      alerts: false
    })


    await Event.query().insert({
      userId: user1.id,
      name: 'Just do it',
      description: 'No micro-transactions, kind of fun, always a classic',
      location: '32B',
      meetUrl: 'https://www.zoom.com',
      eventTypeId: 1,
      gameId: 12,
      studyTopic: '',
      startDate: 1617626970000,
      endDate: 1617677370000,
      repeats: false,
      alerts: false
    })
  }
}

export default EventSeeder
