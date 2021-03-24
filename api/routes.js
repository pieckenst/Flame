module.exports = [ 
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return res.send(
                { statusCode: 200, message: 'API works successfull. Check documentation for more info.' }
            );
        }
    },
    ...require('./controllers/public/routes'),
];