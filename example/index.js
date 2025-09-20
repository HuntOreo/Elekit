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

const childEl = new Elem({ tag: 'p', content: 'yippee' }, {background: 'lightblue'});
el.append(childEl);
el.removeClass('classOne');
el.addClass('container');
el.adopter(body);

el.removeChild(childEl.id);