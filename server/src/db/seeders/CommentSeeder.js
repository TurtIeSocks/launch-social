import { Comment, User, Event } from "../../models/index.js"

class CommentSeeder {
  static async seed() {

    const userCount = await User.query().count('id as value').first()
    const eventCount = await Event.query().count('id as value').first()

    const comments = [
      'I can\'t wait!', 'This looks like so much fun!', 'Looking forward to this.', 'This will be my first time attending!', 'I\'ll definitely be there', 'See you then.', 'I definitely need this in my life.', 'This is so tough!', 'Hi friends.', 'Count me in.', 'I will bring the snacks!', 'Let\'s do it', 'YAAAAAAS'
    ]
    for (let i = 1; i <= parseInt(userCount.value); i++) {
      for (let j = 1; j <= parseInt(eventCount.value); j++) {
        const random = Math.floor(Math.random() * comments.length * 2)
        if (random < comments.length) {
          await Comment.query().insert({
            userId: i,
            eventId: j,
            comment: comments[random]
          })
        }
      }
    }
  }
}

export default CommentSeeder
