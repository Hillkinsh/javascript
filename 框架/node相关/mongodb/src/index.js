var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
 
MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!")
  db.close()
})

// 你添加我，我没有通过。三天之后，我这边显示过期，就没有办法接收你的好友，也没有添加你的选项。
// 我就把你加入黑名单，再把你移除黑名单，然后就可以添加的选项了。然后何欣想知道你那边的状态。
// 并且这种操作能操作多少个人。