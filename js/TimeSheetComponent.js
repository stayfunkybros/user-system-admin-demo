import { Component } from './Component.js';
import Weekday from './Weekday.js';

class TimeSheetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swapNext: 0 /* 0:編集する 1:休日にする 2:削除する */
    };
  }

  onClick() {
    this.setState({
      swapNext: (++this.state.swapNext) % 3
    });
    if (this.state.swapNext === 0) { // clicked:2 -> 0 削除ボタン押下
      this.erase(this.el);
    } else if (this.state.swapNext === 1) { // clicked:0 -> 1 編集ボタン押下
      this.fullfill(this.el);
    } else {
      this.off(this.el);
    }
    this.reCalc(this.el);
  }

  onChange() {
    this.reCalc(this.el);
  }

  render() {
    let y = this.props.id.substring(0, 4);
    let m = this.props.id.substring(4, 6);
    let d = this.props.id.substring(6, 8);
    let day = new Date(y, m - 1, d);
    let weekends = [Weekday['日'], Weekday['土']];
    // <td><input readonly id="sth-else-${this.props.id}" name="sth-else-${this.props.id}" 
    //     class="form-control form-control-plaintext" 
    //     type="text" placeholder="メモ" value="${this.props.memo || ''}"></td>
    return `<table class="fix-bug-line">
    <tr class="date-line ${weekends.includes(day.getDay()) ?
       'table-info text-primary' : this.props.isHoliday ?
       'table-warning text-danger' : ''}">
      <td>
        <span>${day.getDate()}(${Weekday[day.getDay()]})</span>
        <input id="${this.props.id}" name="date-today-${this.props.id}" class="form-control form-control-plaintext" type="hidden" value="${this.props.id}">
      </td>
      <td><input readonly id="start-time-${this.props.id}" name="start-time-${this.props.id}" 
        class="form-control form-control-plaintext bs-timepicker border" 
        type="text" placeholder="" value="${this.props.from || ''}"></td>
      <td><input readonly id="end-time-${this.props.id}" name="end-time-${this.props.id}" 
        class="form-control form-control-plaintext bs-timepicker border" 
        type="text" placeholder="" value="${this.props.to || ''}"></td>
      <td><input readonly id="rest-time-${this.props.id}" name="rest-time-${this.props.id}" 
        class="form-control form-control-plaintext bs-timepicker border" 
        type="text" placeholder="" value="${this.props.rest || ''}"></td>
      <td><input readonly id="totals-per-day-${this.props.id}" name="totals-per-day-${this.props.id}" 
        class="form-control form-control-plaintext daily-total-times" 
        type="text" placeholder="" value="${this.props.total || '00:00'}"></td>
      <td><select id="sth-else-${this.props.id}" class="form-select form-select-sm memo-for-summary">
        <option value="0" ${this.props.memo === '0' ? 'selected' : ''} >なし</option>
        <option value="1" ${this.props.memo === '1' ? 'selected' : ''} >有休</option>
        <option value="2" ${this.props.memo === '2' ? 'selected' : ''} >振休</option>
        <option value="3" ${this.props.memo === '3' ? 'selected' : ''} >休出</option>
        </select></td>
      <td>
        <button type="button" value="${this.state.swapNext}"
          class="btn-in-data-line btn btn-sm ${this.state.swapNext === 0 ?
            'btn-secondary">編' : this.state.swapNext === 2 ?
              'btn-warning">休' :
              'btn-success">勤' }</button>
      </div>
    </tr>
    </table>`;
  }

  reCalc(self) {
    let els = self.closest(".date-line").querySelectorAll("input[type='text']");
    const x = (t) => (t[0] * 60 + t[1] * 1);
    const t_fd = (m) => {
      return `${("0" + Math.floor(m / 60)).substr(-2)}:${("0" + (m % 60)).substr(-2)}`;
    };
    const t_fm = (m) => {
      return `${Math.floor(m / 60)}時間 ${m % 60}分`;
    };
    let s = x(els[0].value.split(':'));
    let e = x(els[1].value.split(':'));
    let o = x(els[2].value.split(':'));
    let total = e - s - o;
    els[3].value = total > 0 ? t_fd(total) : "00:00";

    let totals = 0;
    [...document.getElementsByClassName('daily-total-times')].forEach(element => {
      if (!element.value) return;
      totals = totals + x(element.value.split(':'));
    });
    document.getElementById('month-total').textContent = t_fm(totals);
    document.querySelector('input.month-total').value = totals / 60.0;
  }

  erase(self) {
    let dl = self.closest(".date-line");
    let els = dl.querySelectorAll("input[type='text']");
    els[0].value = "";
    els[1].value = "";
    els[2].value = "";
    els[3].value = "";
    dl.querySelector("select option:checked").selected = false;
    dl.querySelector("select option[value='0']").selected = true;
  }

  off(self) {
    let dl = self.closest(".date-line");
    let els = dl.querySelectorAll("input[type='text']");
    els[0].value = "00:00";
    els[1].value = "00:00";
    els[2].value = "00:00";
    els[3].value = "00:00";
    dl.querySelector("select option:checked").selected = false;
    dl.querySelector("select option[value='1']").selected = true;
  }

  fullfill(self) {
    let dl = self.closest(".date-line");
    let els = dl.querySelectorAll("input[type='text']");
    els[0].value = "9:30";
    els[1].value = "18:30";
    els[2].value = "1:00";
    els[3].value = "8:00";

    $(function () {
      let tp = self.closest(".date-line").querySelectorAll('.bs-timepicker');
      $(tp).timepicker();
    });
  }

}

export { TimeSheetComponent };
export { mount } from './Component.js';
