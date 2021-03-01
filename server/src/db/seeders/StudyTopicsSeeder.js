import { StudyTopic } from "../../models/index.js"

class StudyTopicSeeder {
  static async seed() {

    const categories = [
      { name: 'JavaScript', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png' },
      { name: 'HTML', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1920px-HTML5_logo_and_wordmark.svg.png' },
      { name: 'CSS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/500px-CSS3_logo_and_wordmark.svg.png' },
      { name: 'React', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png' },
      { name: 'NodeJS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png' },
      { name: 'Ruby', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/768px-Ruby_logo.svg.png' },
      { name: 'Python', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png' },
      { name: 'C#', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/C_Sharp_logo.svg/1200px-C_Sharp_logo.svg.png' },
      { name: 'C++', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png' },
      { name: 'GO', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1280px-Go_Logo_Blue.svg.png' },
      { name: 'Java', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png' },
      { name: 'Swift', imageUrl: 'https://www.dlf.pt/dfpng/middlepng/559-5598467_file-swift-logo-svg-wikimedia-commons-swift-programming.png' },
      { name: 'php', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/PHP_Logo%2C_text_only.svg' },
      { name: 'Rust', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png' },
      { name: 'R', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/R_logo.svg/1280px-R_logo.svg.png' },
      { name: 'Kotlin', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin-logo.svg/1024px-Kotlin-logo.svg.png' },
      { name: 'Scala', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Scala-full-color.svg/1280px-Scala-full-color.svg.png' },
      { name: 'TypeScript', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' },
      { name: 'SQL', imageUrl: 'https://i.pinimg.com/originals/d4/af/4c/d4af4c3163d48f3ed98a95302a49ca4d.png' },
      { name: 'PostgreSQL', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png' },
      { name: 'Perl', imageUrl: 'https://banner2.cleanpng.com/20180713/khp/kisspng-perl-6-programming-language-programmer-perl-5b483cf70aedd4.4432914215314608550448.jpg' },
      { name: 'Dart', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Dart-logo.png' },
      { name: 'Jest', imageUrl: 'https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png' },
      { name: 'Cypress', imageUrl: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_7fcb618f84ed24432b01b5f848cab75f/cypress.png' },
      { name: 'GitHub', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' }
    ]

    for (const category of categories) {
      const { name, imageUrl } = category
      await StudyTopic.query().insert({ name, imageUrl })
    }
  }
}

export default StudyTopicSeeder
