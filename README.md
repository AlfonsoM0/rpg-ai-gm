## Game Master AI

Welcome to the Game Master AI repository (or GmAi, for short)!

GmAi is a web application for creating stories by playing tabletop role-playing games driven by artificial intelligence.

**Try it out at:** https://gmai.rpg.ar

### How it Works

1. **Create Your Character:** Invent a name, generate a description with the help of GmAi, and assign characteristics using experience points (XP).
2. **Assemble Your Team:** You can play with up to 2 characters in a story.
3. **Choose Your Adventure:** Tell GmAi what kind of story you'd like to experience.
4. **Play:** GmAi will present you with options to advance the story, but you can also propose your own ideas.
5. **Overcome Challenges:** At key moments, GmAi will ask for a characteristic test (2d6 + characteristic) to determine your success or failure.

### Game Features

- Character creation with AI-enhanced descriptions.
- Character editing with earned XP.
- Sharing characters with friends.
- Recruiting up to 2 characters per story.
- Choosing your preferred story type.
- Creating custom command buttons for common responses to GmAi.
- Over 20 color themes to personalize your experience.
- AI-generated voice narration of the story.
- Voice recognition for writing responses.
- Action buttons ("A", "B", "C") for quick selection between story options.
- Buttons on character sheets for rolling dice.
- Saving stories as books in a library.
- Opening, editing, and sharing books with friends.
- Starting new stories from existing books.

### Game System

- **Characteristic Tests:** Roll 2d6 + characteristic to overcome story challenges.
- **Successes & Failures:** Earn successes on rolls of 10 or higher (2 successes on 14 or higher). Earn failures on rolls below 10 (2 failures on 6 or lower).
- **Story End:** The story ends after 3 failures or 5 successes.
- **Rewards:** Earn XP upon finishing a story (2XP +2XP bonus with 4 or more successes).

### Installation

**Requirements:**

- Code editor (e.g., VSCode)
- Node.js
- API Key from Google's Gemini AI (get one at: https://aistudio.google.com/)
- For saving progress in the database, you'll need a Firebase project (https://firebase.google.com/) with "Firestore Database" and "Authentication" using a Google account.

**Steps:**

1. Clone this repository.
2. Open the project in your code editor.
3. Configure the environment variables (see below).
4. Install dependencies: `npm install`
5. Build the application: `npm run build`
6. Run the application: `npm run start`
7. Access the application in your browser: http://localhost:3000/

**Environment Variables:**

- **.env.local:**
  - `AI_APY_KEY="Your Gemini AI API Key"`
- **For Firebase (in your project's settings as a Web App):**
  - `FIREBASE_API_KEY=`
  - `FIREBASE_AUTH_DOMAIN=`
  - `FIREBASE_PROJECT_ID=`
  - `FIREBASE_STORAGE_BUCKET=`
  - `FIREBASE_MSG_SENDER_ID=`
  - `FIREBASE_APP_ID=`

### Future of the Project

- **Multiplayer Cooperative Mode:** Create stories with up to 4 players.
- **Character Image Generation:** Visualize your characters with the help of GmAi.
- **Video Creation from Books:** Turn your stories into movies.
- **Subscription Plan:** Access unlimited features and exclusive benefits.
- **Android Version:** Play anywhere from your mobile device.

### RPG.ar

GmAi will also be part of other RPG.ar projects:

- **Map:** Find role-playing communities, locations, and players near you.
- **Lumashay:** A complete tabletop role-playing game system with its own world, powered by GmAi.

Join us on this AI-powered role-playing adventure!
