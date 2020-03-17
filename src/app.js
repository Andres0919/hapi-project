const Hapi = require('@hapi/hapi')
const path = require('path')
const inert = require('inert')

const init = async () => {
    const server = Hapi.Server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    })

    await server.register(inert)
    await server.start()
    console.log('Server running on:', server.info.uri)

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return '<h1>Hello world!</h1>'
        }
    })
    
    server.route({
        method: 'GET',
        path: '/about',
        handler: (req, h) => {
            return `<h1>About</h1>`
        }
    })

    server.route({
        method: 'GET',
        path: '/hello/{username}',
        handler: (req, h) => {
            return `<h1>Hello ${req.params.username}</h1>`
        }
    })

    server.route({
        method: 'GET',
        path: '/text.txt',
        handler: (req, h) => {
            return h.file('./text.txt')            
        }
    })
}

init()