module.exports = {
    webpackDevMiddleware: config => {
        // We ask that instead of updating file automatically
        // Pull all the file every 300 ms
        config.watchOptions.poll = 300;
        return config
    }
}