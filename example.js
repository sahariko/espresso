const Espresso = require('.')

const onStart = () => {
    console.log('Server started succesfully!')
}

const server1 = new Espresso({ port: 3001 })
const server2 = new Espresso()

server1.listen()
    .then(onStart)

server1.get('/hello', (req, res) => {
    res.end('Hello world!')
})

server2.listen(3002)
    .then(onStart)

// server2.get(
//     '/hello',
//     (req, res, next) => {
//         console.log('middleware1')
//         next()
//     },
//     (req, res, next) => {
//         console.log('middleware2')
//         setTimeout(next, 500)
//     },
//     (req, res) => {
//         res.send('Hola mundo!')
//     }
// )
