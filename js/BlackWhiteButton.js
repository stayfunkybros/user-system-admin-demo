class BlackWhiteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: true
    };
  }

  onClick() {
    this.setState({
      color: !this.state.color
    })
  }

  render () {
    return `
      <div>
        <button style="color:red;background-color:${this.state.color?'#fff':'#000'}">${this.state.color?'#fff':'#000'}</button>
      </div>
    `
  }
}