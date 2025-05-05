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


<h2>✅ Stateful Authentication:</h2>
<h3>How it works:</h3>
<ul>
<li>When a user logs in, the server creates a session and stores it (often in memory or a database).
<li>A session ID is sent to the client (via a cookie).</li>  
<li>On each subsequent request, the client sends that session ID.</li>  
<li>The server uses that ID to look up the user's session (i.e., their "state").</li>  
</ul>

<h4>Pros:</h4>
<ul>
<li>Easy to implement.</li>
<li>Session can store rich user data (roles, preferences).</li>
</ul>

<h4>Cons:</h4>
<ul>
 <li>Server must store session info → consumes memory.</li>
<li>Harder to scale (needs session replication or sticky sessions).</li>
</ul>

<h2>🚫 Stateless Authentication:</h2>
<h3>How it works:</h3>
<ul>
<li>When a user logs in, the server returns a token (usually a JWT – JSON Web Token).</li>
<li>This token contains all needed info (user ID, roles, expiration, etc.), and is stored client-side (often in localStorage or cookies).</li>
<li>Each request includes the token, and the server verifies it, but doesn't store any session.</li>
</ul>

<h4>Pros:</h4>
<ul>
<li>Easier to scale (no server-side session storage).</li>
<li>Faster — no session lookup needed.</li>
</ul>





<h4>Cons:</h4>
<ul>
  <li>Tokens can't be invalidated easily before expiration (unless using blacklists).</li>
<li>If compromised, tokens can be used until they expire.</li>
</ul>
