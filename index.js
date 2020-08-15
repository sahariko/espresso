const http = require('http')
const {
    HTTP_METHODS
} = require('./constants')
const {
    validateArg,
    generateRouteKey
} = require('./utilities')

const routeMapKey = Symbol()
const serverKey = Symbol()
const handleRequestKey = Symbol()

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
            this[method] = (path, handler) => this.register({
                method,
                path,
                handler
            })
        })

        this[handleRequestKey] = this[handleRequestKey].bind(this)
    }

    [handleRequestKey](req, res) {
        const { method, url } = req
        const key = generateRouteKey(method, url)
        const handler = this[routeMapKey][key]

        if (!handler) {
            console.error(`No handler found for [${method}] "${url}"`)

            return
        }

        handler(req, res)
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
        validateArg({ value: method, type: 'string', name: 'method' })
        validateArg({ value: path, type: 'string', name: 'path' })
        validateArg({ value: handler, type: 'function', name: 'handler' })
        validateArg({ value: middlewares, type: 'array', name: 'middlewares' })

        const key = generateRouteKey(method, path)

        this[routeMapKey][key] = handler
    }
}

module.exports = Server
