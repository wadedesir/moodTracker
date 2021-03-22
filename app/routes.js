const User = require('./models/user')

module.exports = setupRoutes;

function setupRoutes(app, passport) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', isLoggedIn, function (req, res) {
    res.render('main.ejs', { user: req.user });
  });

  app.get('/feelings', isLoggedIn, async function (req, res) {
    const moodData = req.user.moodData
    res.json(moodData)
  })

  app.post('/user', isLoggedIn, async function (req, res) {
    const moodData = req.user.moodData
    const newMood = [req.body.feelingSelect, req.body.feelsMessage, req.body.date]
    moodData.push(newMood)
    const user = await User.findById(req.user._id)
    user.moodData = moodData
    console.log(req.body);
    const result = await user.save()
    // res.json({ user: result })

    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  });

  app.get('/resetAll', isLoggedIn, async function (req, res) {
    const moodData = []
    const user = await User.findById(req.user._id)
    user.moodData = moodData
    console.log(req.body);
    const result = await user.save()
    // res.json({ user: result })

    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  });


  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
