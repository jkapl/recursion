// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  //if current section is not an object or array
  function elementLogic(elem) {
    if (typeof elem === 'boolean' || typeof elem === 'number') {
      return elem.toString();
    }
    if (elem === null) {
      return 'null'
    }
    if (typeof elem === 'string') {
      let result = '"'
      result = result + elem + '"';
      return result;
    }
  }
  
  //if current section is an obj invoke objIterate  
  function objIterate(obj) {
    var result = '{'
    // for (var key in obj) {
    //     result = result + '"' + key.toString() + '"' + ':' + obj[key] + ',';
    // }    
    for (var key in obj) {
        result = result + '"' + elementLogic(key) + '"' + ':' + elementLogic(obj[key]) + ',';
    }
    return result.slice(0,result.length-1) + '}';
  }
  

  //if current section is an array invoke arrIterate
  function arrIterate(arr) {
    if (arr.length === 0) { return '[]' }
    var result = '['
    for (var i=0; i<arr.length; i++) {
      if (Array.isArray(arr[i])) { 
        result = result + arrIterate(arr[i])
      }
      result = result + elementLogic(arr[i]) + ',';
    }
    return result.slice(0,result.length-1) + ']';
  }

  if (Array.isArray(obj)) {
    return arrIterate(obj);
  }

  if (obj === null) {
    return elementLogic(obj);
  }

  if (typeof obj === 'object') {
   return objIterate(obj);
  }
  
  return elementLogic(obj)

};

//[8, [[], 3, 4]]

//JSON.stringify({ x: 5, y: 6 });
// '{"x":5,"y":6}'

//NaN, null, undefined, function() {} => null

//{} => '{}'