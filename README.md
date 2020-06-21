# <img src="https://financialpostcom.files.wordpress.com/2018/09/aaugmented-reality-glyph.jpg?quality=80&strip=all&w=412" alt="drawing" width="30"/> AR Game REST API - Final Augmented Reality Project 
REST API for handling user authentication and handling their gameplays.

|`API URL`| https://aqueous-citadel-85180.herokuapp.com | 
|:----|:------|

## Authentication - Signup
Endpoint for register of a new user. Returns the created user id if registration was success.
|`POST`| /api/v1/auth/signup | 
|:----|:------|
| **URL Params** | None |
| **Data Params** | `{ name: String, email: String, password: String }` | 
| **Success Response** | **Code:** 200 <br /> **Content:** `{ success: true, createdUser: createUser._id }`  |
| **Error Response** | **Code:** 404 <br /> **Content:** `{ success: false, error: String[], }` <br /> OR <br /> **Code:** 500 <br /> **Content:** `{success: false, error: "Server error, try again latter" }` |
| **Sample Call** | `await axios.post('/api/v1/auth/signup', { name: "John Doe", email: "johndoe@doe.com", password: "doe123" });`

<br />

## Authentication - Login
Endpoint for user authentication. Returns user id if login was success.
|`POST`| /api/v1/auth/login | 
|:----|:------|
| **URL Params** | None |
| **Data Params** | `{ email: String, password: String }` | 
| **Success Response** | **Code:** 201 <br /> **Content:** `{ success: true, loggedUserId: string }`  |
| **Error Response** | **Code:** 404 <br /> **Content:** `{ success: false,  msg: "Check username or password" }` <br /> OR <br /> **Code:** 500 <br /> **Content:** `{success: false, error: "Server error, try again latter" }` |
| **Sample Call** | `await axios.post('/api/v1/auth/login', { email: "johndoe@doe.com", password: "doe123" });`

<br />

## Game Round - Start Game
Endpoint for starting user game round. Returns the started game id, and the game options.
|`POST`| /api/v1/gameRound/startGame | 
|:----|:------|
| **URL Params** | None |
| **Data Params** | `{ userId: String, startLocation: { lat: Number, lng: Number } }` | 
| **Success Response** | **Code:** 200 <br /> **Content:** <br /> `{ success: true, gameId: String, gameOptions: { difficulty: Number, enemiesPointsLocations: Object[] } }`  |
| **Error Response** | **Code:** 200 <br /> **Content:** `{ success: true,  msg: "There's already a game session going on." }` <br /> OR <br /> **Code:** 500 <br /> **Content:** `{success: false, error: "Server error, try again latter" }` |
| **Sample Call** | `await axios.post('/api/v1/gameRound/startGame', { userId: johendoeuserid, startLocation: { lat: 200, lng: 200 } }});`


## Game Round - End Game
Endpoint for ending the user game round. Returns stats from the user and the game round.
|`POST`| /api/v1/gameRound/endGame | 
|:----|:------|
| **URL Params** | None |
| **Data Params** | `{ gameId: String, score: Number }` | 
| **Success Response** | **Code:** 200 <br /> **Content:** <br /> `{ success: true, gameStats: { gameDuration: Time in Seconds, score: Number, difficulty: Number }, userStats: { highestScore: Number }, }`  |
| **Error Response** | **Code:** 409 <br /> **Content:** `{ success: false, msg: "There's no game session going on.", }` <br /> OR <br /> **Code:** 500 <br /> **Content:** `{success: false, error: "Server error, try again latter" }` |
| **Sample Call** | `await axios.post('/api/v1/gameRound/endGame', { gameId: johendoegameroundid, score: 5000 });`

