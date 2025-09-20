import { Elem } from "../elekit/elekit.js";

const body = document.querySelector('body');

const styleTemp = {
  backgroundColor: 'lightcoral',
  padding: '10px'
}

const el = new Elem({
  tag: 'div',
  selectors: 'classOne',
  content: `<h1>Hello world!</h1>`
}, styleTemp);
el.adopter(body);