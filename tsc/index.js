// enum 
var Direction;
(function (Direction) {
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["down"] = 2] = "down";
    Direction[Direction["left"] = 3] = "left";
    Direction[Direction["right"] = 4] = "right";
})(Direction || (Direction = {}));
var isMore = false;
var num = 1;
var myStr = 'abc';
var a = null;
var c;
var d;
var sym1;
// 任意值和类型推论
var anyval;
anyval = "ccc";
var anyval2 = "ccc";
var union1 = 2;
var obj1 = {
    key: "abc",
    val: "ddd",
    justread: "justread"
};
// 接口的可选属性
// 只读属性
// 数组的描述 类型 + 【】
var arr = [1, 2, 3];
// 范型，
var arr2 = [1, 2, 4];
function isApiError(error) {
    if (typeof error.code === "number") {
        return true;
    }
    return false;
}
var apiErr = {
    code: 200,
    name: "string",
    age: "age"
};
var httpErr = {
    statusCode: 500,
    name: "string",
    age: "age"
};
console.log(isApiError(apiErr));
console.log(isApiError(httpErr));
