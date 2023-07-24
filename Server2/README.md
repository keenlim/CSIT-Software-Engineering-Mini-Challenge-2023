# Concepts Reviewed 
### Improvements to Code
- Instead of putting all production code in **index.js** file, I have separated into mutiple routes in order to allow for loose dependency and aid in Unit Testing. 
    - Have a dedicated route for flightRoute, hotelRoute as well as the MongoDB Connection

- Tried out Unit Testing using Mocha for flightRoute


### Unit Testing - Using Mocha

#####
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. 

describe() : In Mocha, we have the global describe function, it takes in two parameters, a string and a callback function. The string is the description of te test. We group tests using describe. This function should tell what is it that you are testing. And we can further subdivide this by creating subgroups. 

it() : It is used to write single tests. It takes two parameters, a string and a callback. The string is the description of the test and the callback has the actual code for the test. 


### module.exports - How to Export in Node.js and Javascript

##### Why Export Modules? 
We export modules so that you can use them in other parts of your application. Modules can serve different purposes. THey can provide simplet utilities to modify strings. They can provide methods for making API requests. Or they can even provide constants and primitive values. 
<br/>

##### How to Export Modules in Node
Node.js treats each file in a Node project as a module that can export values and functions from the file. 
```
//example.js
const replaceStr = (str, char, replacer) => {
    const regex = new RegExp(char, "g");
    const replaced = str.replace(regex, replacer);
    return replaced;
}

module.exports = {reapalceStr};
```
Now, <mark style="background-color: #FFFF00">replaceStr</mark> is available for use in other parts of the application. 

To use it, we can import it like this: 
```
const { replaceStr } = require('./example.js');
```