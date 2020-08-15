const http = require('http')
const {
    HTTP_METHODS
} = require('./constants')
const Route = require('./Route')

const routeMapKey = Symbol()
const serverKey = Symbol()
const handleRequestKey = Symbol()

const generateRouteKey = (method, path) => {
    const normalizedMethod = method.toLowerCase()

    return [normalizedMethod, path].join('_')
}

class Server {
    constructor({
        port
    } = {}) {
        Object.assign(this, {
            port
        })

        this[routeMapKey] = {}
        this[serverKey] = null

        HTTP_METHODS.forEach((method) => {
            this[method] = (path, ...chain) => {
                const handler = chain.pop()
                const middlewares = chain

                this.register({
                    method,
                    path,
                    handler,
                    middlewares
                })
            }
        })

        this[handleRequestKey] = this[handleRequestKey].bind(this)
    }

    [handleRequestKey](req, res) {
        const { method, url } = req
        const key = generateRouteKey(method, url)
        const route = this[routeMapKey][key]

        if (!route) {
            console.error(`No handler found for [${method}] "${url}"`)

            return
        }

        route.execute(req, res)
    }

    listen(port = this.port) {
        if (!port) {
            throw new Error('Espresso must be provided with a port to start the server')
        }

        this[serverKey] = http.createServer(this[handleRequestKey])

        return new Promise((resolve) => {
            this[serverKey].listen(port, (resolve))
        })
    }

    register({
        method,
        path,
        handler,
        middlewares = []
    } = {}) {
        const key = generateRouteKey(method, path)

        this[routeMapKey][key] = new Route({
            handler,
            middlewares
        })
    }
}

module.exports = Server
