const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())

app.use(
    morgan((tokens, req, res) => {
        return [tokens.method(req, res), tokens.url(req, res), JSON.stringify(req.body)].join(' ')
    })
)

app.post('/api/auth/login', (req, res) => {
    if (req.body.username === 'john' && req.body.password === 'johny_password123') {
        // TODO token below is not encoded properly
        res.status(200).json({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4iLCJpYXQiOjE1MTYyMzkwMjJ9.A6Ak1IC1KhtSzAor4-i-bZhmCHQya-sRlPy9-DGgQwA',
        })
    } else {
        res.status(401).json({ message: 'Invalid username or password' })
    }
})

app.post('/api/auth/register', (req, res) => {
    if (req.body.username === 'john') {
        res.status(201).send()
    } else {
        res.status(400).json({ message: 'Invalid registration form (put only `john` in username to pass)' })
    }
})

app.listen(port, () => {
    console.log(`Mocks running at port: ${port}`)
})
