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


3 ----> event bubbling is when such a process occurs on any element it first acts on that element and then goes to the parent element.


4 ----> Event Delegation is a method where each child element is given a separate even lesser, but only the parent element is given even lesser.

5 ----> preventDefault() disables the browser's default behavior,,,,,,,   and stopPropagation() prevents the event from propagating to the parent element.