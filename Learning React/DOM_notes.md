Document Object Model

#### document.querySelector(button.blue);
select the blue button from: 
```html
<button class="blue drum">w</button>
```

#### document.querySelector("#list .item");
select the FIRST element. 
"space" between means hiarchical
"." between means further specification, non-hiarchical. 

#### document.querySelectorAll("img")[0];

#### document.querySelector("#list .item");
select the list of element that fit the description

#### document.querySelector("button").classList.add("pressed")
add a class from an element. 
note: don't add a "."
#### document.querySelector("button").classList.remove("pressed")
remove a class from an element. 

#### document.querySelector("button").classList.toggle("invisible");
can toggle on/off a class for a particular element.

___

#### document.querySelector("a").getAttribute("href");
for example get the src in this: `<img class="img1" src="images/dice6.png">`

#### document.querySelector("a").setAttribute("href", "www.bing.com");
for example set the src in this: `<img class="img1" src="images/dice6.png">`

___

#### document.querySelector("h1").innerHTML
returns `<strong>Hello</strong>`


#### document.querySelector("h1").textContent
returns `Hello`



