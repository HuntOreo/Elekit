//  Class based programming
//    Each element will be a Elem class.
//    More common tags like p, headers, buttons, 
//      specific divs such as containers or wrappers, 
//      will be subclasses of Elem.

class Elem {
  constructor({ tag, selectors, content }, styleTemplate) {
    this._DOM_Element = document.createElement(tag);
    this._id = crypto.randomUUID(); // Assigns its own id
    this._children = [];
    this._selectors = selectors;
    this._content = content;
    this._styles = {}
    if (selectors) { this._assignClasses(selectors); };

    // Content can be HTML to make the process of adding 
    // child elements easier for smaller components.
    if (content) { this._DOM_Element.innerHTML = content };

    // Allows for the inclusion of a styling template to apply 
    // on creation of an element. 
    // Format is {property: value, nth}
    if (styleTemplate) { this._applyAllStyle(styleTemplate) };
  }

  get DOMElement() { return this._DOM_Element; }
  get children() { return this._DOM_Element.children; }
  get style() { return this._DOM_Element.style; }
  get id() { return this._id; }

  set children(elements) { this._children = [...DOMElements] }
  set background(value) { this._applyStyle('background', value); }
  set fontColor(value) { this._applyStyle('color', value); }
  set fontSize(value) { this._applyStyle('fontSize', value); }
  set fontFamily(family) { this._applyStyle(fontFamily, family) }
  set padding(value) { this._applyStyle('padding', value); }
  set margin(value) { this._applyStyle('margin', value); }
  set display(value) { this._applyStyle('display', value); }

  applyTemplate(template) { this._applyAllStyle(template); }

  parent(container) {
    container.append(this);
  }

  append(node) {
    const arrayFlag = Array.isArray(node);
    if (arrayFlag) {
      for (let child of node) {
        this._children.push(child);
        this._DOM_Element.append(child.DOMElement);
      }
    }

    if (!arrayFlag) {
      this._children.push(node);
      this._DOM_Element.append(node.DOMElement);
    }
  }

  removeChild(childID) {
    let child;
    const filteredChildren = this._children.filter(item => {
      item.id != childID ? item : child = item;
    });
    this._DOM_Element.removeChild(child.DOMElement);
    this._updateChildren(filteredChildren);
  }

  addClass(...classes) {
    this._assignClasses(classes);
  }

  removeClass(...classes) {
    classes.forEach(name => this._DOM_Element.classList.remove(name));
  }

  assignId() {
    this._DOM_Element.dataset.id = this._id;
  }

  addListener(type, callback) { this._assignListener(type, callback); }

  // HELPER FUNCTIONS
  _applyStyle = (property, value) => {
    this._DOM_Element.style[property] = value;
    this._styles[property] = value;
  }

  _applyAllStyle = (styles) => {
    for (let property in styles) {
      this._applyStyle(property, styles[property]);
    }
  }

  _assignClasses = (selectors) => {
    if (Array.isArray(selectors)) {
      for (let selector of selectors) {
        this._DOM_Element.classList.add(selector);
      }
    }

    if (typeof selectors === "string") {
      this._DOM_Element.classList.add(selectors);
    }
  }

  _updateChildren = (...children) => {
    // reset children
    this._children = [];
    children.forEach(child => {
      this._children.push(child);
    })
  }

  _assignListener = (type, callback) => {
    this.DOMElement.addEventListener(type, callback);
  }

}

class Button extends Elem {
  constructor(element, listener) {
    if (typeof element === "string") {
      super({ tag: 'button', content: element });
      this._assignType('button');
    } else {
      const { selectors, content, type } = element;
      super({ tag: 'button', selectors, content });

      type ? this._assignType(type) : this._assignType('button');
    }
    if (listener) {
      this._listener = listener;
      this._assignListener(listener.type, listener.callback);
    }

    // Assign default styling
    this.padding = '10px';
    this.style.borderRadius = '5px';
    this.style.border = 'none';
  }

  // HELPER FUNCTION
  _assignType = (type) => {
    this._DOM_Element.type = type;
  }
}

class Head extends Elem {
  // Header element format: {size:(1-6), selectors: string, content: string || html}
  constructor(element, template) {
    if (typeof element === 'string') {
      super({
        tag: 'h1',
        content: element
      }, template);
    } else {
      super({
        tag: `h${element.size}`,
        selectors: element.selectors,
        content: element.content,
      }, template);
    }
  }

  changeSize(newSize) {
    const newEl = new Head({
      size: newSize,
      selectors: this._selectors,
      content: this._content
    }, this._styles);

    this._DOM_Element.replaceWith(newEl.DOMElement);
  }
}

class Para extends Elem {
  constructor(element, template) {
    if (typeof element === "string") {
      super({ tag: 'p', content: element }, template);
    } else {
      super({
        tag: 'p',
        selectors: element.selectors,
        content: element.content
      }, template);
    }
  }
}

class Container extends Elem {
  constructor(element, template) {
    if (typeof element === 'string') {
      super({
        tag: 'div',
        selectors: element,
      }, template);
    } else {
      super({
        tag: 'div',
        selectors: element.selectors,
        content: element.content
      }, template);
    }

    if (element.type === 'container') {
      this.addClass('container');
    } else if (element.type === 'wrapper') {
      this.addClass('wrapper');
    }
  }

}

class Img extends Elem {
  constructor(src, template) {
    if (typeof src === 'string') {
      super({
        tag: 'img',
      }, template);

      this.DOMElement.setAttribute('src', src);
    } else {
      super({
        tag: 'img',
        selectors: src.selectors
      }, template);

      this.DOMElement.setAttribute('src', src.src);
      this.DOMElement.setAttribute('alt', src.alt);
    }
  }
}

class Input extends Elem {
  constructor(inputArg, template) {
    if (typeof inputArg === 'string') {
      super({ tag: 'input' });
      this._assignType('text');
      this._assignPlaceholder(inputArg);
    } else if (typeof inputArg === 'object') {
      super({
        tag: 'input',
        selectors: inputArg.selectors,
      });

      if (inputArg.id) this._DOM_Element.id = inputArg.id;
      if (inputArg.name) console.log(this._DOM_Element);

      if (inputArg.placeholder) this._assignPlaceholder(inputArg.placeholder);
      this._assignType(inputArg.type);
    }

    if (template) { this._applyAllStyle(template) }
  }

  // HELPER FUNCTIONS
  _assignType(type) {
    this._DOM_Element.setAttribute('type', type);
  }

  _assignPlaceholder(placeholder) {
    this._DOM_Element.setAttribute('placeholder', placeholder);
  }
}

export {
  Elem,
  Button,
  Head,
  Para,
  Container,
  Img,
  Input
}