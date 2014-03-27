// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
//can use documents.body, element.childNodes, element.classList.contains(classname)
var getElementsByClassName = function (className) {
  // your code here
  //iterate through classes in document.body.childNodes, checking whether they have the class in question
  //by using the classList.contains(classname) method.  Each child Node childNode[...], may also have its own
  //sub childNode, so its necessary to iterate through those too
  
  var checkChildNodes = function(selector) {
    //if class is in childNode
    // return an array of nodes which has the className in question
    // or an object with numeric keys + length
    if (selector.childNodes) { // if selector has child Nodes 
      var childNodeSubElements = [];
      _.each(selector.childNodes , function(element, index) {
        if(selector.childNodes[index].classList){
            if (selector.childNodes[index].classList.contains(className)) {
              childNodeSubElements.push(element);
            }
            childNodeSubElements.push(checkChildNodes(selector.childNodes[index]));
        }
      });
    return childNodeSubElements;
    }
  }

  //return an array of nodes which have the className in question
  return checkChildNodes(document.body);

};
