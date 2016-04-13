var assert = require('assert')
var agent = require('supertest')
var Rill = require('rill')
var rewrite = require('../')

describe('@rill/rewrite', function () {
  it('should rewrite a url', function (done) {
    var request = agent(
      Rill()
        .use(rewrite('/', '/hi'))
        .use(function (ctx, next) {
          ctx.res.status = 200
          assert.equal(ctx.req.path, '/hi?test=true')
          assert.equal(ctx.req.pathname, '/hi')
        })
        .listen()
    )

    request
      .get('/?test=true')
      .expect(200)
      .end(done)
  })

  it('should properly change params', function (done) {
    var request = agent(
      Rill()
        .use(rewrite('/test1/:optionA/:optionB', '/test1/option/$1/option/$2'))
        .use(rewrite('/test2/:optionA/:optionB', '/test2/option/:optionA/option/:optionB'))
        .use(function (ctx) {
          ctx.res.status = 200
          ctx.res.body = ctx.req.pathname
        })
        .listen()
    )

    Promise.all([
      request
        .get('/test1/hello/world')
        .expect('/test1/option/hello/option/world')
        .expect(200),
      request
        .get('/test2/hello/world')
        .expect('/test2/option/hello/option/world')
        .expect(200)
    ])
      .then(done.bind(null, null))
      .catch(done)
  })
})
