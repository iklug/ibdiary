
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/User');
const validatePassword = require('../lib/passwordUtils').validatePassword;

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },async (email, password, done)=>{
        console.log('now in Local Strategy @ config/passport');
        try {
            //make sure the email and password match
            const user = await User.findOne({email});
            if(!user){
                console.log('failed login: no user with that email');
                return done(null, false, {message: 'invalid email'});
            }
            const validPassword = validatePassword(password, user.hash, user.salt);
            if(!validPassword){
                console.log('failed login: password is incorrect');
                return done(null, false, {message: 'invalid password'})
            }
            console.log('successful local strategy journey');
            return done(null, user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    })
);

//serializeUser will put the user.id into the session
passport.serializeUser((user,done)=>{
    console.log('in serialize user @ config/passport');
    done(null, user.id);
});

//deserializeUser will take the userId and populate that to the req.user object
passport.deserializeUser(async(id,done)=>{
    console.log('in deserializeUser @ config/passport');
    try {
        const user = await User.findById(id);
        if(user){
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log('straight to the error huh');
        console.error(error);
        done(error);
    }
});