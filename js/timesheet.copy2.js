    import { encodeJson } from './js/Codify.js';
    let shareFormData = {
      // e.g. '20211101': {'f':'08:13', 't':'19:00', 'r':'01:00', 's':'8:00', 'm':'meishi'}
    };
    $("#share").click(function share() {
      $('.date-line').each(function () {
        let d = $(this).find('input:hidden').first().val();
        if (d.length !== '8') {
          let tp = $(this).find(':input:not(:hidden)');
          let sfd = {};
          sfd.f = tp[0].value, sfd.t = tp[1].value, sfd.r = tp[2].value, sfd.s = tp[3].value, sfd.m = tp[4].value;
          shareFormData[d] = sfd;
        }
      });
      let obj = shareFormData;
      let shardLink = window.location.href.split('?')[0] + '?s=' + encodeJson(obj);
      navigator.clipboard.writeText(shardLink)
        .then(() => alert('Copied shared link to clipboard.'))
        .catch((e) => alert('Failed to copy shared link.'))
    });