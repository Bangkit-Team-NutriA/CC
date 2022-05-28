class NewUser {
  constructor(payload) {   
    this._re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/;
    this.type = {
      email: 'string',
      password:'string',
      name: 'string',
      birthOfDate: 'string',
      sex: 'boolean',
      weight: 'number',
      height: 'number',
      timesOfExercise: 'number'
    };
    this._verifyPayload(payload);
    this.email =  payload.email;
    this.password = payload.password;
    this.nama = payload.name;
    this.tanggallahir = payload.birthOfDate;
    this.jeniskelamin = payload.sex;
    this.berat = payload.weight
    this.tinggi = payload.height;
    this.olahraga = payload.timesOfExercise;
  }
  _verifyPayload(payload) {
    for (let key in this.type) {
      if (payload[key] === '') {
        throw new Error('Can\'t empty parameter');
      }
      if (typeof payload[key] !== this.type[key]) {
        throw new Error('wrong type of parameter');
      }
    }
    if(!payload.email.match(this._re)) {
      throw new Error('please input email type format');
    }
  }
}
module.exports = NewUser;