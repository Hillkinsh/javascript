// var src = jsonpScriptSrc(chunkId)
var matchHost = new RegExp('^\\\\w{0,6}:?\\\\/\\\\/([^/]*)')
// var host = src.match(matchHost)[0]
// var tagHost = domains[retryTimes].match(matchHost)[0]

let domains = ['//s.vipkidstatic.com', '//s.vipkidresource.com']
for (let i=0; i<domains.length; i++) {
  console.log(domains[i].match(matchHost) && domains[retryTimes].match(matchHost)[0])
}
// script.src = src.replace(host,tagHost)

const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

const regex = /dog/gi;

console.log(p.replace(regex, null));
// expected output: "The quick brown fox jumps over the lazy ferret. If the ferret reacted, was it really lazy?"

console.log(p.replace('dog', 'monkey'));
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"
