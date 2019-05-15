// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var elemArr = [];

    var getChildren = function(currentNode, elemArr) {
      
      for (var i=0; i<currentNode.childNodes.length; i++) {
       if (currentNode.childNodes[i].classList && _.contains(currentNode.childNodes[i].classList, className)) {
            elemArr.push(currentNode.childNodes[i]);
          }
        }
        if (currentNode[i].childNodes[0]) {
            getChildren(currentNode[i], elemArr);
        }
    }
    getChildren(document, elemArr);
    return elemArr;
};


//base case: if document.childNodes[i].hasChildNodes() === false return 

//recursive case getElementsByClassName(childNodes)
//if _.contains(document.childNodes[i].classList, className) { elemArr.push(document.childNodes[i]) }