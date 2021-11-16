const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(cors());

const TOKEN = 'random-token'

app.post('/login',
    (req, res) => {
        if (!req.body.email || req.body.email.includes('bad')) {
            return res.status(401).json({
                messages: {
                    email: 'Invalid credentials',
                },
            })
        }

        return res.json({
            token: TOKEN,
        })
    },
)

app.get('/me',
    (req, res) => {
        if (!req.query.token || req.query.token !== TOKEN) {
            return res.status(401).json({
                message: 'invalid token',
            })
        }
        return res.json({
            user: {
                id: 1,
                name: 2,
            },
        })
    },
)

app.listen(8088, '0.0.0.0', () => {
    console.log('App listening on http://0.0.0.0:8088');
})
