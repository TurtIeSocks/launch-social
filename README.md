# Launch Social

## Description
React based platform for coordinating and creating gaming activities or study sessions with your fellow students or friends. 

## Features 
- View all events that have been created by other users
- Create your own events for sharing
- Preloaded with some of the most popular programming languages to select when creating a study event
- If creating a gaming related event, an async search field searches over a hundred thousand games courtesy of IGDB
- Automatically generates and displays game details on event pages, including a summary, platforms, genres, images, and videos
- RNG based seeder that can automatically generate more events for demo purposes
- Users can indicate whether they are interested or plan to attend each event
- Sign in with GitHub for ease of use

## Technologies Used
- Internet Games Database API Integration
- React frontend
- Express/NodeJS backend
- Material UI Styling
- GitHub OAuth signin
- Font Awesome
- HTML
- CSS
- PostgreSQL
- Objection
- Knex

## PreReqs
- NodeJS (Recommend using V14.*)
- PostgreSQL

## Installation Instructions
1. Clone the repo
2. Open up the directory (`cd launch-social`)
3. `yarn install`
4. Setup your .env file (`cp server/.env.example server/.env`)
5. Fill in the fields
- You can get your GitHub ID, Secret, and CallbackURL from https://github.com/settings/developers
- You can check out IGDB's website to setup your Twitch ID and token https://api-docs.igdb.com/#about
- Session_Secret can be any randomly generated string
6. createdb launch-social_development
7. Once setup, `cd server` and `yarn migrate:latest`
8. If you would like to seed some data `yarn db:seed` while still in the server folder, if not `cd ..` back into the root folder
9. `yarn start`

## Demo
https://launch-social.herokuapp.com/

## Coming Soon
- Ability for users to add comments to events
- Better structured homepage
- Visual calendar to view which days have active events
- Homepage event filters