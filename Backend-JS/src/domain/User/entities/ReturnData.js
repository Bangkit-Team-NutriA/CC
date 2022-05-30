class ReturnData{
  constructor(payload) {
    this.type = {
      nama: "string",
      tanggallahir: "object",
      jeniskelamin: "boolean",
      berat: "number",
      tinggi: "number",
      olahraga: "number"
    }
    this.verifyPayload(payload);
    this.nama = payload.nama
    this.tanggallahir = new Date(payload.tanggallahir).toISOString().split('T')[0]
    this.jeniskelamin = payload.jeniskelamin
    this.berat = payload.berat
    this.tinggi = payload.tinggi
    this.olahraga = payload.olahraga
  }
  verifyPayload(payload) {
    for (let key in this.type) {
      if (payload[key] === '') {
        throw new Error('Can\'t empty parameter');
      }
      if (typeof payload[key] !== this.type[key]) {
        console.log(key)
        console.log(typeof(payload[key]))
        throw new Error('wrong type of parameter');
      }
    }
  }
}
module.exports = ReturnData;
