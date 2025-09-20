import { Elem, Button } from "../elekit/elekit.js";

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
const container = new Elem({
  tag: 'div',
  selectors: 'container',
  content: `<h1>Hello world!</h1>`
});

// Apply styling after element is created.
container.background = 'lightcoral';
container.display = 'flex';
container.style.flexDirection = 'column';
container.style.fontFamily = 'Trebuchet MS';

// Can be passed a styling template as an alternative
const containerTemp = {
  padding: '0 10px',
  fontWeight: '400',
  color: 'lightgreen'
}

container.applyTemplate(containerTemp);

/* 
  Templates can be created for applying repetitive styling onto elements, 
  similar to classes, on creation of the element.

  format: { propertyName: propertyValue, nth... }
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

container.parent(body); // set parent to body (appends element to body tag)
container.append(childEl); // append a child element
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
const btn = new Button({ content: 'Submit', type: 'submit' });

container.append(btn);
btn.style.maxWidth = '100px';
btn.addListener('click', (event) => {
  event.preventDefault();
  alert('clicked me!')
});