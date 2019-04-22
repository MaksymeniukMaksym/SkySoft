
var arr = [1,[[[2]]],2,[],3,'abc',[4,[7, [34]],5,[],6]];
var arr1 = ['abc',[4,[7, [34]]]];
var arr2 = [1,5,[],6];

Array.prototype.join = function(str) {
  let result = "";
  function innerFunction(innerArr) {
    for (let element of innerArr) {
      if (!Array.isArray(element)) {
        result += element + str;
      } else {
        innerFunction(element);
      }
    }

    return result.slice(0,-1);
  }
  return innerFunction(this) ;
};

console.log(arr.join('-'));
console.log(arr1.join('-'));
console.log(arr2.join('-'));