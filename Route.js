const runMiddleWare = (middleware, req, res) => new Promise((resolve) => {
    middleware(req, res, resolve)
})

class Route {
    constructor({
        handler,
        middlewares = []
    }) {
        Object.assign(this, {
            handler,
            middlewares
        })
    }

    async execute(req, res) {
        for (let i = 0; i < this.middlewares.length; i++) {
            const middleware = this.middlewares[i]

            await runMiddleWare(middleware, req, res)
        }

        return this.handler(req, res)
    }
}

module.exports = Route
