const app = require('express')()
const port = 4001
const server = require('http').createServer(app);

app.get('/', (req, res) => res.send('Hello World!'))

const io = require('socket.io')(server);

let playersData = {}

io.on('connection', (socket) => {
    socket.join('quiz')
    let id = socket.id
    playersData.id = {
        score: 0
    }
    socket.to('quiz').emit('playersData', playersData)

    socket.on('changeName', (name) => {
        playersData.id.name = name
        socket.to('quiz').emit('nameChanged', { id, name })
    })

    socket.on('score', (score) => {
        playersData.id.score += score
        socket.to('quiz').emit('scoreUpdated', { id, score })
    })

    socket.on('disconnect', () => {
        io.to('quiz').emit('disconnect', { id })
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});