DATABASE_NAME = "twitter-archive"
COLLECTION_NAME = "tweets"
TAGS = ["mongodb", "ruby"]

require 'mongo'
# database
@con = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'test')
db = @con.database

# collection
@users = db[:people]

def initialize(tag)
  connection = Mongo::Client.new([ '127.0.0.1:27017' ])
  db = connection[DATABASE_NAME]
  @tweets = db[COLLECTION_NAME]

  @tweets.create_index([['id', 1]], :unique => true)
  @tweets.create_index([['tags', 1], ['id', -1]])
  @tag = tag
  @tweets_found = 0
end

def save_tweets_for(term)
  Twitter::Search.new.containing(term).each do |tweet|
    @tweets_found += 1
    tweet_with_tag = tweet.to_hash.merge!({"tags" => [term]})
    @tweets.save(tweet_with_tag)
  end
end