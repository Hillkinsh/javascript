require 'mongo'
# database
@con = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'test')
db = @con.database
# collection
@users = db[:people]

doc = {name: 'Steve', hobbies: [ 'hiking', 'tennis', 'fly fishing' ]}
smith = {"last_name": "smith", "age": 30}
jones = {"last_name": "jones", "age": 40}

# document

# result = collection.insert_one(doc)
# collection.insert_one(smith)
# collection.insert_one(jones)
# @users.insert_many([jones, jones,jones])

# update
# @users.update_one({"last_name": "smith"}, {"$set": {"city": "Chicago"}})
# @users.update_many({"name" => "Steve"}, {"$set" => {"city" => "New York"}}, :multi => true)

# delete
# @users.delete_one({"last_name": "smith"})
# @users.delete_many({"name": "Steve"})

# create_one或create_many

smit = {"filename": "7131.png",
  "filesize": "150992922qq837.126",
  "userid": BSON::ObjectId("5e7b0e699d1fa256d81ed694")
}

$i = 0
$num = 50

while $i < $num  do
    # puts("在循环语句中 i = #$i" )
    @users.insert_one(smit)
    # @users.delete_one({"last_name": "smith_"})
    $i +=1
end

puts "***********"
puts "***********"
puts "***********"
puts "***********"
