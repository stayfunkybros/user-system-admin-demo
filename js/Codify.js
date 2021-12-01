// const parseJwt = (token) => {
//   try {
//     let o = token.split('.');
//     return [
//       JSON.parse(atob(o[0])),
//       JSON.parse(atob(o[1])),
//       null
//       // JSON.parse(atob(o[2]))
//     ];
//   } catch (e) {
//     console.log(`ERROR: ${e}`);
//     return null;
//   }
// };

// const parseHeaderJwt = (token) => {
//   return parseJwt(token) ? parseJwt(token)[0] : null;
// }

// const parsePayloadJwt = (token) => {
//   return parseJwt(token) ? parseJwt(token)[1] : null;
// }

// const parseSignatureJwt = (token) => {
//   return parseJwt(token) ? parseJwt(token)[2] : null;
// }

const parseToken = (token) => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(token))));
  } catch (e) {
    return null;
  }
}

const encodeJson = (obj) => {
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  } catch (e) {
    return null
  }

}

export { parseToken, encodeJson }