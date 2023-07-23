# Concepts Reviewed 

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