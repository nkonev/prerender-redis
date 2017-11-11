#!/usr/bin/env node
var prerender = require('./lib');

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    accessLog: {
          // Check out the file-stream-rotator docs for parameters
          fileStreamRotator: {
              frequency: 'custom',
              verbose: true
          },

          // Check out the morgan docs for the available formats
          morgan: {
//              format: 'combined'
		format: '[:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms ":user-agent"'
          }
      }
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());
server.use(require('prerender-access-log'));
server.use(require('prerender-redis-cache'));
server.start();
