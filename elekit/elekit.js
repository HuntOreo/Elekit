// Class based programming
//      Each element will have a parent "element" class used for general tags.
//      more common tags like p, headers, buttons, specific divs such as containers or wrappers, 
//           will be extended children of Element and will have more specific methods and properties for it

class Elem {
  constructor ({ tag, selectors, content }, styleTemplate) {
    this._element = document.createElement(tag);
    this._id = crypto.randomUUID(); // Asigns its own id
    this._element.dataset.id = this._id;
    this._children = [];
    if (selectors) { this.#assignClasses(selectors); };
    
    // Content can be HTML to make the process of adding 
    // child elements easier for smaller components.
    if (content) { this._element.innerHTML = content };

    // Allows for the inclusion of a styling template to apply 
    // on creation of an element. 
    // Format is {property: value, nth}
    if (styleTemplate) {this.#applyAllStyle(styleTemplate)};
  }

  get element() { return this._element; }
  get children() { return this._element.children; }
  get style() { return this._element.style; }
  get id() { return this._id; }

  set children(elements) { this._children = [...elements] }
  set background(value) { this.#applyStyle('background', value); }
  set fontColor(value) { this.#applyStyle('color', value); }
  set fontSize(value) { this.#applyStyle('fontSize', value); }
  set padding(value) { this.#applyStyle('padding', value); }
  set margin(value) { this.#applyStyle('margin', value); }
  set display(value) { this.#applyStyle('display', value); }
  
  applyTemplate(template) { this.#applyAllStyle(template); }
  
  parent(parent) { parent.append(this._element); }
  
  append(children) {
    const arrayFlag = Array.isArray(children);
    if (arrayFlag) { 
      for (let child of children) {
        this._children.push(child);
        this._element.append(child.element); 
      }
    }

    if (!arrayFlag) { 
      this._children.push(children);
      this._element.append(children.element); 
    }
  }

  removeChild(childID) {
    let child;
    const filteredChildren = this._children.filter(item => {
      item.id != childID ? item : child = item;
    });
    this._element.removeChild(child.element);
    this.#updateChildren(filteredChildren);
  }

  addClass(...classes) {
    this.#assignClasses(classes);
  }

  removeClass(...classes) {
    classes.forEach(name => this._element.classList.remove(name));
  }

  // HELPER FUNCTIONS
  #applyStyle = (property, value) => {
    this._element.style[property] = value;
  } 

  #applyAllStyle = (styles) => {
    for (let property in styles) {
      this.#applyStyle(property, styles[property]);
    }
  }

  #assignClasses = (selectors) => {
    if (Array.isArray(selectors)) {
      for (let selector of selectors) {
        this._element.classList.add(selector);
      }
    }

    if (typeof selectors === "string") {
      this._element.classList.add(selectors);
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

export {
  Elem,
}