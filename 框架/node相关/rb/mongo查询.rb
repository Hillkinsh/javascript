# mongo shell

#1。选择器匹配
db.user.find({name:'hello'})

#2. 范围查询
# $gt $gte $lt $lte
db.people.find({age: {$lt: 12, $gt:5}})

#3. 集合操作符
$in 
$in 多个单属性查询的or
db.people.find({_id: {$in: [
  ObjectId("5e7a04a09d1fa2378fea89c9"),
  ObjectId("5e7a04a09d1fa2378fea89ca"),
  ObjectId("5e7a04a09d1fa2378fea89cb")
  ]
}})
$nin 是$in的补集

db.products.find(tags: { $all: ["gift", "garden"] })

# 匹配子文档
