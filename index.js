var secrets = require('./secrets')

var twitterRss = require('rss-twitter')(secrets.CONSUMER_KEY, secrets.CONSUMER_SECRET, secrets.ACCESS_TOKEN, secrets.ACCESS_SECRET);

var http = require('http')

http.createServer(function (req, res) {
  var user = req.url.substring(1)

  twitterRss.feed(user, function (err, feed) {
    if (err) {
      res.end(err)
    } else {
      res.end(feed.render('rss-2.0'));
    }
  })
}).listen(6000)

