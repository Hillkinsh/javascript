const Template = require("webpack/lib/Template");
let source = 'source'
let chunk = 'chunk'
let hash = 'hash'
this.options = {
  domains: []
}
function jsonpScript () {}

let result = Template.asString([
  source,
  "",
  "// JSONP chunk loading for javascript",
  "",
  "var installedChunkData = installedChunks[chunkId];",
  'if(installedChunkData !== 0) { // 0 means "already installed".',
  Template.indent([
    "",
    '// a Promise means "currently loading".',
    "if(installedChunkData) {",
    Template.indent([
      "promises.push(installedChunkData[2]);"
    ]),
    "} else {",
    Template.indent([
      "// setup Promise in chunk cache",
      "var promise = new Promise(function(resolve, reject) {",
      Template.indent([
        "installedChunkData = installedChunks[chunkId] = [resolve, reject];"
      ]),
      "});",
      "promises.push(installedChunkData[2] = promise);",
      "",
      "// start chunk loading",
      "(function jsonpScriptSrcLoad(domains, retryTimes){",
      jsonpScript.call("", chunk, hash),
      "document.head.appendChild(script);",
      `})([${this.options.domains.map(item => {
  return "\"" + item + "\"";
}).join(',')}],${this.options.domains.length - 1})`
    ]), 
    "}"
  ]), 
  "}"
]);

console.log(result)