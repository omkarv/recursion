// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  //check if obj is an array, object
  var outputString = "";
  if(Array.isArray(obj)) {
    outputString = outputString + "[";
    for (var item = 0; item < obj.length; item++) {
       var val = obj[item];
       if(Array.isArray(val)) {
        outputString += stringifyJSON(obj[item]);
       }  else if(typeof val === 'number') {
        outputString += obj[item];
       } else if((typeof val === 'string')||(typeof obj === 'boolean')) {
        outputString += '"' + obj[item] + '"';
       } else if(typeof val === 'undefined') {
        outputString += "null";
       } else if(typeof val === 'object') {
        outputString += stringifyJSON(obj[item]);
       }
       //add comma between lines if item is not last in array
       if(item !== (obj.length-1))
       {
        outputString += ",";
       }
    }
    outputString = outputString + "]";
    console.log(outputString);
  } else if(typeof obj === 'object') {   
      var count = 0;
      
      outputString = outputString + "{";
      for (var key in obj) {
             var noComma = false;
             var value = obj[key];
             if(Array.isArray(value)) {
              outputString +=  '"' + key + '"' + ":" + stringifyJSON(value);
             } else if(typeof value === 'number') {
              outputString += '"' + key + '"' + ":" + value; 
             } else if(typeof value === 'string') {
              outputString += '"' + key + '"' + ":" + '"' + value + '"';
             } else if(typeof value === 'boolean') {
              outputString += '"' + key + '"' + ":" + value  ;
             } else if(value === null) {
              outputString +=  '"' + key + '"' + ":" + value; 
             } else if(typeof value === 'object') {
              outputString +=  '"' + key + '"' + ":" + stringifyJSON(value); 
             } else {//(typeof value === 'undefined') || (typeof obj === 'function')) {
              //do nothing
              noComma = true;
             }
             // add comma between items if not last
             count += 1;
             if((count !== Object.keys(obj).length) && (!noComma)) // and 
             {
              outputString += ",";
             }
      }
      outputString = outputString + "}";

  }

  return outputString;

};
