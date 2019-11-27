interface StringValidator {
  isAcceptable(s: string): boolean
}

let lettersRegexp = /^[A-Za-z]+$/;
let numberRegexp = /^[0-9]+s/;

class LetterOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s)
  }
}

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s)
  }
}

let strings = ['hello', '98052', '101']

let validators: {}