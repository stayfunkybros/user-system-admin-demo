class TimeSheetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isCleared: false };
  }

  onClick() {
    this.setStat({
      isCleared: !this.state.isCleared
    });
  }

  render() {
    this.el = createDom(`
    <tr class="date-line">
      <td><input class="form-control form-control-plaintext" type="text" readonly value="3(月)"></td>
      <td><input class="form-control form-control-plaintext" type="text" placeholder="hh:mm" value=""></td>
      <td><input class="form-control form-control-plaintext" type="text" placeholder="hh:mm" value=""></td>
      <td><input class="form-control form-control-plaintext" type="text" placeholder="hh:mm" value=""></td>
      <td><input class="form-control form-control-plaintext" type="text" placeholder="hh:mm" value=""></td>
      <td><input class="form-control form-control-plaintext" type="text" placeholder="備考" value=""></td>
      <td>${this.state.isCleared ?
        '<button class="btn btn-outline-success btn-sm" onclick="fullfill(this);" type="button">入</button>' :
        '<button class="btn btn-danger btn-sm" onclick="erase(this);" type="button">削</button>'}
      </td>
    </tr>
    `);
    this.el.querySelectorAll('button').addEventListener('click', () => consoler.log('click'), false);
    return this.el;
  }
}

/*
  fullfill/erase
*/
