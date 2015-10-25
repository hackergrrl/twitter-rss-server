#!/usr/bin/env node

var http = require('http')
var path = require('path')
var rssTwitter = require('twitter-rss-noauth')


var port = 6000
var argv = require('minimist')(process.argv.slice(2));
port = argv['p'] || argv['port'] || 6000

var server = http.createServer(function (req, res) {
  var user = req.url.substring(1)

  rssTwitter(user, function (err, feed) {
    if (err) {
      res.end(err)
    } else {
      res.end(feed)
    }
  })
})

server.listen(port, function () {
  console.log('http://localhost:' + port)
})

