// Class based programming
//      Each element will have a parent "element" class used for general tags.
//      more common tags like p, headers, buttons, specific divs such as containers or wrappers, 
//           will be extended children of Element and will have more specific methods and properties for it

class Elem {
  // common ways I manipulate elements: 
    // Applying classes,
    // Populate with text content,
    // Apply padding
    // Apply margin
    // Apply background color
    // Apply font size
    // Append children

  // Less common, but still important:
    // Add id
    // Add dataset
    // Remove classes
    // Remove child element

  constructor ({ tag, selectors, content }, styleTemplate) {
    this._element = document.createElement(tag);
    if (selectors) { this.#assignClasses(selectors); };
    
    // Content can be HTML to make the process of adding 
    // child elements easier for smaller components.
    if (content) this._element.innerHTML = content;

    // Allows for the inclusion of a styling template to apply 
    // on creation of an element. 
    // Format is {property: value, nth}
    if (styleTemplate) {this.#applyAllStyle(styleTemplate)};
  }

  get element() { return this._element; }
  get children() { return this._element.children; }
  get style() { return this._element.style; }
  set background(value) { this.#applyStyle('background', value); }

  adopter(parent) { parent.append(this._element); }
  
  append(children) {
    const arrayFlag = Array.isArray(children);
    if (arrayFlag) { 
      for (let child of children) {
        this._element.append(child); 
      }
    }

    if (!arrayFlag) { this._element.append(children); }
  }

  // PRIVATE METHODS
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

}


export {
  Elem,
}