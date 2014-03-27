// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };
var getElementsByClassName = function (className) {

  //iterate through childnodes in document.body.childNodes, checking whether they have the class in question
  //by using the classList.contains(classname) method.  Each child Node childNode[...], may also have its own
  //sub childNode, so its necessary to iterate recursively through those too
  var searchChildNodes = function(selectedElement) { 
 // this function searches an html element's child elements for an element with the class in question
 // it will output an array with elements, that are labelled with the class specified in the parent function argument
    if (selectedElement.childNodes) { // if selectedElement has child Nodes 
      var childNodeSubElements = [];
      _.each(selectedElement.childNodes , function(element, index) {
        var selectedElementsChild = selectedElement.childNodes[index];
        if(selectedElementsChild.classList){
            if (selectedElementsChild.classList.contains(className)) {
              childNodeSubElements.push(element);
            }
            childNodeSubElements.push(searchChildNodes(selectedElementsChild)); // recursive call
        }
      });
    return childNodeSubElements;
    }
  };

  //return an array of nodes which have the className specified in the argument
  return _.flatten(searchChildNodes(document.body));
};
