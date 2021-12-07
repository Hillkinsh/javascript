var Koa = require("koa");
var router = require("koa-router");
var app = new Koa();
var route = router();

route.get("/hello", getHello);
async function getHello () {
  this.body="hello....";
}
app.use(route.routes());


app.listen(3000, function() {
  console.log("koa server is running on http://localhost:3000")
})