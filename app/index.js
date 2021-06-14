const express = require('express')
const bodyParser = require('body-parser')
const Rollbar = require('rollbar')
const app = express()
const port = 3000

// Middlewares
app.use(bodyParser.json())
const rollbar = new Rollbar({
  accessToken: 'fdc2aa15222548ffaaca0b40a684cbf3',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
app.use(rollbar.errorHandler());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! (v1.1)')
})

app.use("/api", require("./routes/api"));

app.use("/error", (req, res) => {
  rollbar.critical('Hello, this is a critical error!')
  res.status(200).send("Error sent")
})
// Running server
if (process.env.NODE_ENV === 'test') {
	module.exports = app;
} else {
	app.listen(port,'0.0.0.0', () => {
        console.log(`Sample app listening at http://0.0.0.0:${port}`)
    })
}
