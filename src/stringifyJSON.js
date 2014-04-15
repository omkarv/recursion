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
      outputString = "" + obj;
 
  } else if(obj === undefined) { //check if undefined
    outputString = undefined;

  } else if(typeof obj === 'object') {         //check if object  ****** OBJECT HANDLING
      var count = 0;  //counting no of processed key value pairs in current object
      //outputString = outputString + "{";
      for (var key in obj) {
             var noComma = false; //flag of whether to append a comma or not
             var value = obj[key];
             var output = [];
             results.push(stringifyJSON(key) + ":" + stringifyJSON(value));
      }
      outputString = "{" + results.join(",") + "}";


  }

  return outputString;
};
