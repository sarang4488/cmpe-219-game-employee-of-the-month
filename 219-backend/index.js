const app = require('express')()
const port = 4001
const server = require('http').createServer(app);

app.get('/', (req, res) => res.send('Hello World!'))

const io = require('socket.io')(server);

let playersData = {}

io.on('connection', (socket) => {
    console.log("hello")

    socket.join('quiz')
    let id = socket.id
    let leader = Object.keys(playersData).length === 0
    playersData[id] = {
        score: 0,
        leader
    }
    const broadcastPlayersData = () => {
        io.in('quiz').emit('playersData', playersData)
    }

    broadcastPlayersData()

    socket.on('changeName', (name) => {
        console.log("changeName", name)
        playersData[id].name = name
        broadcastPlayersData()
    })

    socket.on('updateScore', (score) => {
        console.log("updateScore", score)
        playersData[id].score += score
        broadcastPlayersData()
    })

    socket.on('startGame', () => {
        console.log("startGame")
        io.in('quiz').emit('gameStarted')
    })

    socket.on('disconnect', () => {
        console.log('disconnected', playersData[id])
        socket.leave('quiz')
        delete playersData[id]
        broadcastPlayersData()
    })
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});