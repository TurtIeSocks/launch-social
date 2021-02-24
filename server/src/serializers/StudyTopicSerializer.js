class StudyTopicSerializer {
  static async getOne(studyTopic) {
    const allowedAttributes = ["id", "name", "imageUrl"]
    let serializedStudyTopic = {}

    for (const attribute of allowedAttributes) {
      serializedStudyTopic[attribute] = studyTopic[attribute]
    }

    return serializedStudyTopic
  }

  static async getAll(studyTopics) {
    return await Promise.all(studyTopics.map(async studyTopic => {
      const serializedStudyTopic = await StudyTopicSerializer.getOne(studyTopic)
      return serializedStudyTopic
    }))
  }

  static async homepage(studyTopic) {
    return studyTopic.imageUrl
  }
}

export default StudyTopicSerializer