const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})



// Running server
if (process.env.NODE_ENV === 'test') {
	module.exports = app;
} else {
	app.listen(port, () => {
        console.log(`Sample app listening at http://localhost:${port}`)
    })
}