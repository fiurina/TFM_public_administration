async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

function getHexFromBase58(_base58){
  let hashResult = {};
  var decoded = bs58.decode(_base58);
  let hex = Array.prototype.map.call(new Uint8Array(decoded), x => ('00' + x.toString(16)).slice(-2)).join('');
  hashResult.hash_function = "0x"+hex.substring(0,2);
  hashResult.hash_size = "0x"+hex.substring(2,4);
  hashResult.digest = "0x"+hex.substring(4);
  // console.log('Conversion de Base58 a HEX ', _base58, ' ---> ', hashResult);
  return hashResult;
}

function getBase58FromHex(_hex){
  _hex = _hex.substring(2);
  let base58 = bs58.encode(new Buffer(_hex, "hex"));
  // console.log('Conversion de HEX a Base58 ',_hex, ' ---> ', base58);
  return base58;
}

module.exports = {
    asyncForEach,
    getHexFromBase58,
    getBase58FromHex,
}