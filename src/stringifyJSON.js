// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  var outputString = ""; //initialising outputs
  //check if input obj is a string, number, array, object, boolean or undefined
  //then carry out resulting processing based on the input type 
  if(Array.isArray(obj)) { // check if array  ****** ARRAY HANDLING below
    var results = [];
    for (var item = 0; item < obj.length; item++) {
       var val = obj[item];
       results.push(stringifyJSON(val));
    }
    outputString = "[" + results.join(',') + "]";

  } else if(typeof obj === 'string') {    //check if string
      outputString = '"' + obj + '"';

  } else if(typeof obj === 'number') {   //check if number
      outputString = obj.toString();

  } else if((obj === null )||(typeof obj === 'boolean')) {    // check if null or boolean
      outputString += obj;
 
  } else if(obj === undefined) { //check if undefined
    outputString = undefined;

  } else if(typeof obj === 'object') {         //check if object  ****** OBJECT HANDLING
      var output = [];
      for (var key in obj) {
             var value = obj[key];
             if ((typeof value !== 'function') && (value !== undefined)) {
              output.push(stringifyJSON(key) + ":" + stringifyJSON(value));
             }
      }
      outputString = "{" + output.join(',') + "}";
  }
  return outputString;
};
