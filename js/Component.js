const createDom = (dom) => {
  const div = document.createElement('div');
  div.innerHTML = dom;
  return div.querySelector('tr') || div.firstElementChild || div || null;
}

const mount = (component, tar) => {
  tar.appendChild(component.renderDom())
  component.onStateChange = (exEl, el) => {
    tar.insertBefore(el, exEl);
    tar.removeChild(exEl);
  }
}

class Component {
  constructor(props = {}) {
    this.props = props;
  }

  setState(state) {
    const exEl = this.el;
    this.state = state;
    this.el = this.renderDom();
    if (this.onStateChange) {
      this.onStateChange(exEl, this.el);
    }
  }

  renderDom() {
    this.el = createDom(this.render())
    if (this.onClick) {
      this.el.querySelector('button').addEventListener('click', this.onClick.bind(this), false);
    }
    if (this.onChange) {
      [...this.el.querySelectorAll('.bs-timepicker')].forEach(element => 
        element.addEventListener('change', this.onChange.bind(this), false));
    }
    return this.el;
  }
}

export { Component, createDom, mount };