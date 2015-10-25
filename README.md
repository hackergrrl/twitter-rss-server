# twitter-rss-server

> Serve Twitter user timelines as RSS feeds.


# installation

```
$ npm install -g twitter-rss-server
```

# usage

Use the `twitter-rss-server` command to run. It defaults to port 6000 on your
local machine, but you can use `-p` or `--port` to set it to something else.

```
$ twitter-rss-server
```

From here you can treat `http://localhost:6000/username` as a regular RSS feed!

```
$ curl http://localhost:6000/noffle

<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>Noffle Twitter RSS</title>
        <description>A generated feed of the tweets from Noffle</description>
        <link>https://twitter.com/Noffle</link>
    ...
```

Each request to the HTTP endpoint makes a fresh request to the Twitter API,
making it stateless: fire up the server and grab fresh RSS data whenever you
like!


# license

MIT

