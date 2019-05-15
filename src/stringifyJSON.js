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
    var result = [];
    for (var key in obj) {
        if (Array.isArray(key)) {
            //result.push(arrLogic(key) + ':');
            var k = arrLogic(key) + ':';
        } if (typeof key === 'object' && key !== null) {
            var k = objIterate(key);
        } else {
            //result.push(elementLogic(key)+':');
            var k = elementLogic(key)+':';
        }
        if (Array.isArray(obj[key])) {
            //result.push(arrLogic(obj[key]));
            var val = arrLogic(obj[key]);
        }  else if (typeof obj[key] === 'object' && obj[key] !== null) {
            var val = objIterate(obj[key]);
        } else {
            //result.push(elementLogic(obj[key]));
            var val = elementLogic(obj[key]);
        }
        result.push(k + val);
        //result = result + '"' + elementLogic(key) + '"' + ':' + elementLogic(obj[key]) + ',';
    }

    return '{' + result.join(',') + '}';
  }
  

  //if current section is an array invoke arrIterate
  function arrLogic(arr) {
    let result = []
    if (Array.isArray(arr) && arr.length === 0) { return '[]' }
    for (var i=0; i<arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result.push(arrLogic(arr[i]))
      } else {
        result.push(elementLogic(arr[i]));
      }
    }
    return '[' + result + ']';
  }

  if (Array.isArray(obj)) {
    return arrLogic(obj);
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