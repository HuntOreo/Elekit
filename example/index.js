import { Elem, Button, Header } from "../elekit/elekit.js";

const body = document.querySelector('body');

/* 
  * = optional.

  Constructor({tag: "", *selectors: "" || [], *content: "" }, *template: {})

  Takes an object containing key info for the element, 
  and an optional styling template to immediately apply styling on creation.

  tag = the specific tag being created
  selectors = the classes being applied
  content = what is populating the new element
    ! This can take pure html as well, rather than just text. 
    ! `<h1>Content</h1>` is valid and will render as expected
  template = an optional object containing css properties that will be applied on creation.
*/
const containerOne = new Elem({
  tag: 'div',
  selectors: 'container',
  content: `<h1>Hello world!</h1>`
});

// Apply styling after element is created.
containerOne.background = 'lightcoral';
containerOne.display = 'flex';
containerOne.style.flexDirection = 'column';
containerOne.style.fontFamily = 'Trebuchet MS';

// Can be passed a styling template as an alternative
const containerTemp = {
  padding: '0 10px',
  fontWeight: '400',
  color: 'lightgreen'
}

containerOne.applyTemplate(containerTemp);

/* 
  Templates can be created for applying repetitive styling onto elements, 
  similar to classes, on creation of the element.

  format: { propertyName: propertyValue, nth... }

  templates can be added after the fact using the applyTemplate method.
*/
const styleTemplate = {
  background: 'lightblue',
  textAlign: 'center',
  fontFamily: 'system-ui',
  color: 'gray'
}

const childEl = new Elem({
  tag: 'p',
  content: 'yippee'
}, styleTemplate); // Pass style template on instantiation

containerOne.appendEl(childEl); // append a child element
/*
*
*
*
*
*
*
*
*/
// Specific Elements //
/*
*/
// Button
const containerTwo = new Elem({ tag: 'div', selectors: 'container' });
const btn = new Button({ content: 'Submit', type: 'submit' });
btn.addListener('click', (event) => {
  event.preventDefault();
  alert('clicked me!');
});
const header = new Elem({ tag: 'h1', content: 'Container Two' });

containerTwo.appendEl(header);
containerTwo.appendEl(btn);
/*
*/
// Header

const headerOne = new Header({
  size: 2, // size of the header (1-6)
  content: 'Container Three',
}, { color: 'purple' });

const containerThreeTemplate = {
  background: 'lightgreen',
  fontFamily: 'system-ui'
}

const containerThree = new Elem({tag: 'div', selectors: 'container'}, containerThreeTemplate);

const contentOne = new Elem({ tag: 'p', content: 
  `<b>WARNING</b>: This is a paragraph!`
 }, { color: 'red' });

const elements = [headerOne, contentOne];

containerThree.appendEl(elements);

headerOne.changeSize(1); // Change element from header 2 to header 1;
/*
*
**
***
**
*
**
***
**
*
*/
body.append(containerOne.DOMElement);
body.append(containerTwo.DOMElement);
body.append(containerThree.DOMElement);