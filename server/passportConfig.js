///// [ Passport setup ] /////
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const users = []; // Replace this with your MySQL users table.

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      // Find user in your MySQL database.
      // Assuming you have a function called "findUserByUsername".
      findUserByUsername(username, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Find user by ID in your MySQL database.
    // Assuming you have a function called "findUserById".
    findUserById(id, (err, user) => {
      done(err, user);
    });
  });
};