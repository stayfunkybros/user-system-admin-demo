var Weekday;
(function (Weekday) {
  Weekday[Weekday['日'] = 0] = '日';
  Weekday[Weekday['月'] = 1] = '月';
  Weekday[Weekday['火'] = 2] = '火';
  Weekday[Weekday['水'] = 3] = '水';
  Weekday[Weekday['木'] = 4] = '木';
  Weekday[Weekday['金'] = 5] = '金';
  Weekday[Weekday['土'] = 6] = '土';
})(Weekday || (Weekday = {}));

export default Weekday;