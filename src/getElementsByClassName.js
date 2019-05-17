// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var elemArr = [];
  function checkNodes (node) {
    if (node.hasChildNodes()) {
      for (var i=0; i< node.childNodes.length;i++) {
        if (_.contains(node.childNodes[i].classList, className)) {
          elemArr.push(node.childNodes[i]);
        }
        checkNodes(node.childNodes[i]);
      }
    }
    return elemArr;
    }
    return checkNodes(document);
};