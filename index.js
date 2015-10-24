var http = require('http')
var prompt = require('prompt')
var rssTwitter = require('rss-twitter')
var configstore = require('configstore')

var conf = new configstore('twitter-rss-server')

promptForKeys(startServer)

function startServer () {
  var twitterApi = rssTwitter(conf.get('CONSUMER_KEY'), conf.get('CONSUMER_SECRET'), conf.get('ACCESS_TOKEN'), conf.get('ACCESS_SECRET'))

  http.createServer(function (req, res) {
    var user = req.url.substring(1)

    twitterApi.feed(user, function (err, feed) {
      if (err) {
        res.end(err)
      } else {
        res.end(feed.render('rss-2.0'))
      }
    })
  }).listen(6000)
}

function promptForKeys (cb) {
  var fields = [
    'CONSUMER_KEY',
    'CONSUMER_SECRET',
    'ACCESS_TOKEN',
    'ACCESS_SECRET',
  ]
  var missingFields = fields.filter(function (f) { return !conf.get(f) })
  if (!missingFields.length) {
    cb()
    return
  }

  prompt.start()

  prompt.get(missingFields, function (err, res) {
    if (err) {
      return process.exit(err)
    } else {
      Object.keys(res).forEach(function (k) {
        conf.set(k, res[k])
      })
      cb()
    }
  })
}
