# Authentication-Authorization

<h1>Authentication in ExpressJS:</h1>
Authentication in Express.js refers to the process of verifying the identity of a user or client trying to access your application. It ensures that users are who they claim to be before granting them access to protected resources.

<h2>🔐 Common Authentication Methods in Express.js:</h2>
<h3>Username & Password (Form-based):</h3>
1. User submits credentials via a login form.<br>
2. Server checks credentials against a database.<br>
3. If valid, a session or token is created.

<h3>Session-Based Authentication:</h3>
1. Uses libraries like express-session.<br>
2. Stores user session data on the server.<br>
3. Sends a cookie to the client to maintain the session.

<h3>Token-Based Authentication (e.g., JWT):</h3>
1. After login, server sends a JWT (JSON Web Token) to the client.<br>
2. Client includes the token in headers (usually Authorization) on each request.<br>
3. No server-side session needed (stateless).

<h3>OAuth or Third-Party Authentication:</h3>
1. Use services like Google, Facebook, GitHub for login.<br>
2. Typically implemented using passport.js.

<h2>🔧 Libraries Commonly Used for Authentication in Express:</h2>
1. express-session – for session-based auth<br>
2. passport – middleware for various strategies<br>
3. jsonwebtoken – for JWT-based auth<br>
4. bcrypt – for hashing passwords
