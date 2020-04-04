const obj = {
  name: 'jscoder',
  skill: ['es', 'a', 'b'],
  say: function () {
    for (var i = 0, len = this.skill.length; i < len; i++) {
      setTimeout((i => {
        return _ => {
          console.log('no' + i + this.name)
          console.log(this.skill[i])
          console.log('-----------------')
        }
      })(i), 0)
      console.log(i+1)
    }
  }
}
obj.say()
/**
 * 1
 * 2
 * 3
 * no 1 js
 * es
 * no 2 js
 * a
 * no 3 js
 * b
 */