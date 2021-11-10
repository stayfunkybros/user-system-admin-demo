import { Component } from './Component.js';
import Weekday from './Weekday.js';

class TimeSheetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCleared: true
    };
  }

  onClick() {
    this.setState({
      isCleared: !this.state.isCleared
    });
    if (this.state.isCleared) { // after setSte()
      this.erase(this.el);
    } else {
      this.fullfill(this.el);
    }
  }

  render() {
    let y = this.props.id.substring(0, 4);
    let m = this.props.id.substring(4, 6);
    let d = this.props.id.substring(6, 8);
    let day = new Date(y, m - 1, d);
    let weekends = [Weekday['日'], Weekday['土']];
    
    return `<table class="fix-bug-line">
    <tr class="date-line ${weekends.includes(day.getDay()) ?
       'table-info text-primary' : this.props.isHoliday ?
       'table-warning text-danger' : ''}">
      <td>
        <span>${day.getDate()}(${Weekday[day.getDay()]})</span>
        <input id="${this.props.id}" name="date-today-${this.props.id}" class="form-control form-control-plaintext" type="hidden" value="20210501">
      </td>
      <td><input readonly id="start-time-${this.props.id}" name="start-time-${this.props.id}" class="form-control form-control-plaintext bs-timepicker" type="text" placeholder="hh:mm" value=""></td>
      <td><input readonly id="end-time-${this.props.id}" name="end-time-${this.props.id}" class="form-control form-control-plaintext bs-timepicker" type="text" placeholder="hh:mm" value=""></td>
      <td><input readonly id="rest-time-${this.props.id}" name="rest-time-${this.props.id}" class="form-control form-control-plaintext bs-timepicker" type="text" placeholder="hh:mm" value=""></td>
      <td><input readonly id="totals-per-day-${this.props.id}" name="totals-per-day-${this.props.id}" class="form-control form-control-plaintext" type="text" placeholder="hh:mm" value=""></td>
      <td><input readonly id="sth-else-${this.props.id}" name="sth-else-${this.props.id}" class="form-control form-control-plaintext" type="text" placeholder="メモ" value=""></td>
      <td>
        <button type="button" class="btn btn-sm ${this.state.isCleared ?
        'btn-outline-success">入' :
        'btn-danger">削'}</button>
      </div>
    </tr>
    </table>`;
  }

  erase(self) {
    let els = self.closest(".date-line").querySelectorAll("input[type='text']");
    els[0].value = "";
    els[1].value = "";
    els[2].value = "";
    els[3].value = "";
    els[4].value = "";
  }

  fullfill(self) {
    let els = self.closest(".date-line").querySelectorAll("input[type='text']");
    els[0].value = "9:00";
    els[1].value = "18:00";
    els[2].value = "1:00";
    els[3].value = "8:00";
    els[4].value = "";

    $(function () {
      let tp = self.closest(".date-line").querySelectorAll('.bs-timepicker');
      $(tp).timepicker();
    });
  }

}

export { TimeSheetComponent };
export { mount } from './Component.js';