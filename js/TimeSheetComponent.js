/*
  Utility
*/
const createDom = (dom) => {
  const div = document.createElement('div');
  div.innerHTML = dom;
  return div;
}

const mount = (component, tar) => {
  tar.appendChild(component.renderDom())
  component.onStateChange = (exEl, el) => {
    tar.inssertBefore(el, exEl);
    tar.removeChild(exEl);
  }
}

/*
  Component
*/
class Component {
  constructor (props = {}) {
    this.props = props;
  }

  setState (state) {
    const exEl = this.el;
    this.state = state;
    this.el = this.renderDom();
    if (this.onStateChange) {
      this.onStateChange(exEl, this.el);
    }
  }

  renderDom () {
    this.el = createDom(this.render())
    if (this.onClick) {
      this.el.querySelectorAll('button')[0].addEventListener('click', this.onClick.bind(this), false);
    }
    return this.el;
  }
}

class TimeSheetComponent extends Component {
  constructor () {
    this.state = { isCleared: false }
  }

  setState (state) {
    this.state = state
    this.el = this.render()
    if (this.)
  }

  changeState () {
    this.setState({
      isCleared: !this.state.isCleared
    })
  }

  render () {
    this.el = createDom(`
      <tr class="table-warning">
        <td>1(土)</td>
        <td>09:00</td>
        <td>18:00</td>
        <td>01:00</td>
        <td>08:00</td>
        <td></td>
        <td>${this.state.isCleared ?
          '<button class="btn btn-outline-info btn-sm pt-0 pb-0">一括入力</button>' :
          '<button class="btn btn-outline-danger btn-sm pt-0 pb-0">クリア</button>'
        }</td>
      </tr>
    `);
    this.el.querySelectorAll('button').addEventListener('click', () => consoler.log('click'), false);
    return this.el;
  }
}