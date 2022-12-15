    import { TimeSheetComponent, mount } from './js/TimeSheetComponent.js';
    import { parseToken } from './js/Codify.js';

    let url = (new URL(document.location)).searchParams;
    let p = url.get('s');
    p = p && p.replace(/\s/g, '+'); // TODO: Don't know why replaced, just fixed...
    let formData = p ? parseToken(p) : null;
    let curDate = (d => (d.length === 8) ? d : (new Date()).toISOString().slice(0, 10).replace(/-/g, ""))
      ((formData && Object.keys(formData)[0]) || ((url.get('d') || '') + '01').substr(0, 8));
    let curMonth = Number(curDate.substr(4, 2));
    let curYear = Number(curDate.substr(0, 4));

    const timesheet = document.querySelector('#time-sheet-area');
    fetch("https://holidays-jp.github.io/api/v1/" + curYear + "/date.json")
      .then(res => res.json())
      .then(holidays => initCal(holidays))
      .catch(err => alert('Initial Calander Getting ERROR:' + err));

    function initCal(hd) {
      let calender = [];

      let d_Day = new Date(curYear, curMonth, 0);
      document.getElementById('curDateYM').textContent = d_Day.getFullYear() + '年' + (d_Day.getMonth() + 1) + '月';
      let dDm1m = new Date(curYear, curMonth - 1, 0);
      document.getElementById('preDateYM').href = "./timesheet.html?d=" + dDm1m.getFullYear() + ('0' + (dDm1m.getMonth() + 1)).substr(-2);

      let days = d_Day.getDate();
      for (let i = 1; i <= days; i++) {
        let d = {};
        d.id = curYear + '-' + (('0' + curMonth).slice(-2)) + '-' + (('0' + i).slice(-2));
        if (hd[d.id]) {
          d.isHoliday = true;
        }
        d.id = d.id.replace(/-/g, '');
        if (formData && formData[d.id]) {
          let fd = formData[d.id];
          let f = fd.f || '';
          let t = fd.t || '';
          let r = fd.r || '';
          let s = fd.s || '';
          let m = fd.m || '0';
          d.from = f, d.to = t, d.rest = r, d.total = s, d.memo = m;
        }
        calender.push(d);
      }

      calender.forEach(day => {
        mount(new TimeSheetComponent(day), timesheet);
      })

      if (formData) { $(".bs-timepicker")[0].dispatchEvent(new Event("change")); }

      document.getElementById('month-std').textContent = 
        ($('tr.date-line').length - $('tr.date-line.table-info.text-primary').length - $('tr.date-line.table-warning.text-danger').length) * 8;
      // let m0 = $(".memo-for-summary option[value='0']:checked").length;
      // let m1 = $(".memo-for-summary option[value='1']:checked").length;
      // let m2 = $(".memo-for-summary option[value='2']:checked").length;
      // let m3 = $(".memo-for-summary option[value='3']:checked").length;
    }