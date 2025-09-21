//  Class based programming
//    Each element will have a parent "element" class used for general tags.
//    More common tags like p, headers, buttons, 
//      specific divs such as containers or wrappers, 
//      will be extended children of Element and 
//      will have more specific methods and properties for it

class Elem {
  constructor({ tag, selectors, content }, styleTemplate) {
    this._DOM_Element = document.createElement(tag);
    this._id = crypto.randomUUID(); // Assigns its own id
    this._DOM_Element.dataset.id = this._id;
    this._children = [];
    this._selectors = selectors;
    this._content = content;
    this._styles = {}
    if (selectors) { this.#assignClasses(selectors); };

    // Content can be HTML to make the process of adding 
    // child elements easier for smaller components.
    if (content) { this._DOM_Element.innerHTML = content };

    // Allows for the inclusion of a styling template to apply 
    // on creation of an element. 
    // Format is {property: value, nth}
    if (styleTemplate) { this.#applyAllStyle(styleTemplate) };
  }

  get DOMElement() { return this._DOM_Element; }
  get children() { return this._DOM_Element.children; }
  get style() { return this._DOM_Element.style; }
  get id() { return this._id; }

  set children(elements) { this._children = [...DOMElements] }
  set background(value) { this.#applyStyle('background', value); }
  set fontColor(value) { this.#applyStyle('color', value); }
  set fontSize(value) { this.#applyStyle('fontSize', value); }
  set padding(value) { this.#applyStyle('padding', value); }
  set margin(value) { this.#applyStyle('margin', value); }
  set display(value) { this.#applyStyle('display', value); }

  applyTemplate(template) { this.#applyAllStyle(template); }

  parent(container) {
    console.log(this);
    container.appendEl(this);
  }

  appendEl(node) {
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
    this.#updateChildren(filteredChildren);
  }

  addClass(...classes) {
    this.#assignClasses(classes);
  }

  removeClass(...classes) {
    classes.forEach(name => this._DOM_Element.classList.remove(name));
  }

  // HELPER FUNCTIONS
  #applyStyle = (property, value) => {
    this._DOM_Element.style[property] = value;
    this._styles[property] = value;
  }

  #applyAllStyle = (styles) => {
    for (let property in styles) {
      this.#applyStyle(property, styles[property]);
    }
  }

  #assignClasses = (selectors) => {
    if (Array.isArray(selectors)) {
      for (let selector of selectors) {
        this._DOM_Element.classList.add(selector);
      }
    }

    if (typeof selectors === "string") {
      this._DOM_Element.classList.add(selectors);
    }
  }

  #updateChildren = (...children) => {
    // reset children
    this._children = [];
    children.forEach(child => {
      this._children.push(child);
    })
  }
}

class Button extends Elem {
  constructor(element, listener) {
    if (typeof element === "string") {
      super({ tag: 'button', content: element });
      this.#assignType('button');
    } else {
      const { selectors, content, type } = element;
      super({ tag: 'button', selectors, content });

      type ? this.#assignType(type) : this.#assignType('button');
    }
    if (listener) {
      this._listener = listener;
      this.#assignListener(listener.type, listener.callback);
    }

    // Assign default styling
    this.padding = '10px';
    this.style.borderRadius = '5px';
    this.style.border = 'none';
  }

  addListener(type, callback) { this.#assignListener(type, callback); }

  // HELPER FUNCTION
  #assignListener = (type, callback) => {
    this.DOMElement.addEventListener(type, callback);
  }

  #assignType = (type) => {
    this._DOM_Element.type = type;
  }
}

class Header extends Elem {
  // Header element format: {size:(1-6), selectors: string, content: string || html}
  constructor({size, selectors, content}, template) {
    super({
      tag: `h${size}`,
      selectors: selectors,
      content: content,
    }, template);
  }

  changeSize(newSize) {
    const newEl = new Header({
      size: newSize,
      selectors: this._selectors,
      content: this._content
    }, this._styles);

    this._DOM_Element.replaceWith(newEl.DOMElement);
  }
}

export {
  Elem,
  Button,
  Header
}