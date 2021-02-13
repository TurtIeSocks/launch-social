import { Event, User } from "../../models/index.js"

class EventSeeder {
  static async seed() {

    const user1 = await User.query().insert({ githubId: 11111, username: 'admin', accessToken: '55555555', profileUrl: 'https://www.github.com/admin', avatarUrl: 'https://www.clipartmax.com/png/middle/319-3191274_male-avatar-admin-profile.png' })

    await Event.query().insert({
      userId: user1.id,
      name: 'Solo Gaming Party',
      description: 'Great time playing a controversial game',
      location: 'My Room',
      url: 'https://www.cyberpunk2077.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 1,
      studyTopic: '',
      yearId: 2,
      monthId: 4,
      day: 3,
      hour: 14,
      minute: 0,
      duration: 2,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Halo LAN Party Baby',
      description: 'Old school vibes. Halo LAN party, yeah!',
      location: 'Launch Pad',
      url: 'https://www.halo.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 2,
      studyTopic: '',
      yearId: 2,
      monthId: 2,
      day: 14,
      hour: 16,
      minute: 15,
      duration: 1,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'A Holiday Trip to an Island Far Far Away',
      description: 'Come enjoy a relaxing evening on a boutique island with your favorite animal friends.',
      location: 'Nook Island',
      url: 'https://www.animalcrossing.com',
      meetUrl: 'https://www.googlemeetup.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 3,
      studyTopic: '',
      yearId: 2,
      monthId: 3,
      day: 1,
      hour: 12,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Suuuuuuper Maaaaaaaario Bros 2',
      description: 'Old school vibes playing a classic',
      location: '1990',
      url: 'https://www.supermario.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 4,
      studyTopic: '',
      yearId: 2,
      monthId: 5,
      day: 4,
      hour: 16,
      minute: 30,
      duration: 6,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Come explore the land of Hyrule',
      description: 'Climb mountains, swim across lakes, explore spooky forests, oh boy!',
      location: 'Home',
      url: 'https://www.legendofzelda.com',
      meetUrl: 'https://www.googleMeetup.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 5,
      studyTopic: '',
      yearId: 2,
      monthId: 5,
      day: 20,
      hour: 18,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'No, YOU\'RE SUS',
      description: 'Online classic',
      location: 'Wherever',
      url: 'https://www.amongus.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 6,
      studyTopic: '',
      yearId: 2,
      monthId: 3,
      day: 20,
      hour: 20,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Get Ready To Be Toxic',
      description: 'We\'re getting too comfortable with each other, lets increase the toxicity',
      location: 'Launch Academy',
      url: 'https://www.lol.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 7,
      studyTopic: '',
      yearId: 2,
      monthId: 5,
      day: 15,
      hour: 10,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Lets Beat Up Some Kids',
      description: 'You know you want to',
      location: 'Boston Common',
      url: 'https://www.fortnite.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 8,
      studyTopic: '',
      yearId: 2,
      monthId: 5,
      day: 15,
      hour: 10,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })

    await Event.query().insert({
      userId: user1.id,
      name: 'Yo, the classic, lets mine some blocks',
      description: 'Bring snacks, it\'s going to be a long night',
      location: 'Mom\'s basement',
      url: 'https://www.minecraft.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 9,
      studyTopic: '',
      yearId: 2,
      monthId: 2,
      day: 20,
      hour: 20,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })


    await Event.query().insert({
      userId: user1.id,
      name: 'Just do it',
      description: 'No micro-transactions, kind of fun, always a classic',
      location: '32B',
      url: 'https://www.diablo3.com',
      meetUrl: 'https://www.zoom.com',
      imageUrl: 'https://www.imgur.com',
      eventTypeId: 1,
      gameId: 12,
      studyTopic: '',
      yearId: 2,
      monthId: 2,
      day: 17,
      hour: 6,
      minute: 0,
      duration: 6,
      repeats: false,
      alerts: false
    })
  }
}

export default EventSeeder
