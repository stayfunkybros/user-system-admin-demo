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
      <div style='background-color: ${this.state.color?"#fff":"#000"}'>Black or White</div>
    `
  }
}