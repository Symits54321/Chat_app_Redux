const passport = require('passport');
const User = require('../models/userModel');
const LocalStrategy = require('passport-local').Strategy;


// Define the authentication strategy
passport.use(new LocalStrategy({
    usernameField: 'username' // Assuming 'name' is used for username field
}, async function (username, password, done) {
    try {
        // Find the user in the database
        const user = await User.findOne({ name: username });
        if (!user || user.password !== password) {
            // User not found or password doesn't match
            return done(null, false);
        }
        // User authenticated successfully
        return done(null, user);
    } catch (error) {
        console.log('Error in Passport local strategy:', error);
        return done(error);
    }
}));

// Serialize user to decide what data to store in the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user from the session data
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.error('Error deserializing user:', err);
            done(err);
        });
});

// Middleware to authenticate Socket.IO connections using Passport.js
function authenticateSocket(socket, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return next(new Error('Authentication failed.')); }

        // Associate authenticated user's data with socket connection
        socket.user = user;
        return next();
    })(socket.handshake, {}, next);
}

function setAuthenticatedUser(req, res, next) {
    // Set authenticated user logic here, e.g., req.user = authenticatedUser;
    next();
}

module.exports = { passport, authenticateSocket };
