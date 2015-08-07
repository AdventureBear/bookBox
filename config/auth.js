// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '478438952323017', // your App ID
        'clientSecret'  : '6e0dceb130669847718ac76df77e96e3', // your App Secret
        'callbackURL'   : 'https://book-box-adventurebear.c9.io/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'https://book-box-adventurebear.c9.io/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'https://book-box-adventurebear.c9.io/auth/google/callback'
    }

};