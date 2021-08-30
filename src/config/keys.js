
const { default: parseJwk } = require('jose/jwk/parse');

exports.getPrivateKey = async ()=>{
  return parseJwk({
    alg: 'ES256',
    crv: 'P-256',
    kty: 'EC',
    d: 'VhsfgSRKcvHCGpLyygMbO_YpXc7bVKwi12KQTE4yOR4',
    x: 'ySK38C1jBdLwDsNWKzzBHqKYEE5Cgv-qjWvorUXk9fw',
    y: '_LeQBw07cf5t57Iavn4j-BqJsAD1dpoz8gokd3sBsOo'
  })
}
exports.getRecoveryKey = async ()=>{
  return parseJwk({
    alg: "ES256",
    crv: "P-256",
    kty: "EC",
    d: "egLAi-_v4q8XdnxjpglV6nlZPlG59bCahra1uaAcf3c",
    x: "Acr658R8dc7ZCVztADjwV6Q-n_IhiPwJHqmtX7hOPcE",
    y: "2mGlEhGncgaPSUCpNl8YMTDV2uyLIJGWkgm3qTjHCRY",
})
}
exports.getRefreshKey = async () => {
  return parseJwk({
    "kty": "EC",
    "d": "1CJaptrNyxsmfWdT6PAtvTi3HwnY1lxv3ur_MACq5Jc",
    "use": "sig",
    "crv": "P-256",
    "kid": "sig-1617215734",
    "x": "KEgNoUL-o56Yvh3SFTwZ3pAhpsG45cNIPpIqVFAs4A4",
    "y": "LeCw544r_GZ4TpJ6rysHu10e8FvcIx7duEIwcrMl208",
    "alg": "ES256"
  })
}


