1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
2. How do you create and insert a new element into the DOM?
3. What is Event Bubbling? And how does it work?
4. What is Event Delegation in JavaScript? Why is it useful?
5. What is the difference between preventDefault() and stopPropagation() methods?



1 ---> ans: (a), select a single element by id because id's unique selector, example: document.getElementById("id Name"),

(b), select element by className, example:  document.getElementsByClassName("className"),

(c), querySelector: returns the first element that matches the selector, example: let el = document.querySelector(".className"), get the id document.querySelector("# id name"),

(d), querySelectorAll: returns all elements that match the selector , example: let el = document.querySelector(".className"), get the id document.querySelector("# id name")


2 ---> (create): let newDiv = document.createElement("div"); (Insert): document.body.appendChild(newDiv);

