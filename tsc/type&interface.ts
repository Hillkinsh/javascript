// type & interface

// 声明合并

interface Song {
  voice: string,
}
interface Song {
  name: string,
}

let s:Song = {
  voice: 'www',
  name:"dddddd"
}

// 如下写法报错
// type SongType = {
//   voice: string,
// }
// type SongType = {
//   name: string,
// }
