// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  //check if input obj is a string, number, array, object, boolean or undefined
  //then carry out resulting processing based on the input type 
  var outputString = "";
  if(Array.isArray(obj)) { // check if array
    outputString = outputString + "[";
    for (var item = 0; item < obj.length; item++) {
       var val = obj[item];
       if(Array.isArray(val)) {
        outputString += stringifyJSON(val); // recursive call of function, to obtain stringified array

       } else if(typeof val === 'number') {
        outputString += obj[item];

       } else if((typeof val === 'string')||(typeof obj === 'boolean')) {
        outputString += '"' + obj[item] + '"';

       } else if(typeof val === 'undefined') {
        outputString += "null";

       } else if(typeof val === 'object') {
        outputString += stringifyJSON(obj[item]);  // recursive call of function, to obtain stringified object
       }
       //add comma between lines if item is not last in array
       if(item !== (obj.length-1)) {
        outputString += ",";
       }
    }
    outputString = outputString + "]";

  } else if(typeof obj === 'string') {    //check if string
      outputString = '"' + obj + '"';

  } else if(typeof obj === 'number') {   //check if number
      outputString = obj.toString();

  } else if((obj === null )||(typeof obj === 'boolean')) {    // check if null or boolean
      outputString = "" + obj + "";

  } else if(typeof obj === 'object') {         //check if object
      var count = 0;  //counting no of processed key value pairs in current object
      outputString = outputString + "{";
      for (var key in obj) {
             var noComma = false; //flag of whether to append a comma or not
             var value = obj[key];
             if(Array.isArray(value)) {

              outputString +=  '"' + key + '"' + ":" + stringifyJSON(value);  // recur

             } else if((typeof value === 'number')||(value === null)||(typeof value === 'boolean')) {
              outputString += '"' + key + '"' + ":" + value;

             } else if(typeof value === 'string') {
              outputString += '"' + key + '"' + ":" + '"' + value + '"';

             } else if(typeof value === 'object') {
              outputString +=  '"' + key + '"' + ":" + stringifyJSON(value);

             } else {//(typeof value === 'undefined') || (typeof obj === 'function')) {
              //do not append a comma when value is undefined or a function
              noComma = true; // set do nothing flag
             }

             // add comma between items if not last or the item is not to be outputted, as the value is fn or undefined
             count += 1; // processed one key value pair in object, therefore increase count by one
             if((count !== Object.keys(obj).length) && (!noComma)) {
              outputString += ",";
             }
      }
      outputString = outputString + "}";

  } else if(obj === undefined) { //check if undefined
    outputString = undefined;

  }

  return outputString;

};
