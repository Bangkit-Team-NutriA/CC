const AddUserUseCase = require("../../../applications/User/AddUserUseCase");
const EditUserUseCase = require("../../../applications/User/EditUserUseCase");
const GetUserUseCase = require("../../../applications/User/GetUserUseCase");

class UserHandler {
  constructor(container) {
    this._container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
    this.putUserHandler = this.putUserHandler.bind(this);
    this.getUserHandler = this.getUserHandler.bind(this);
  }
  async postUserHandler(req, h) {
    const payload = req.payload;
    console.log(payload);
    payload['sex'] = (payload['sex']==='true');
    payload['weight'] = parseInt(payload['weight']);
    payload['height'] = parseInt(payload['height']);
    payload['timesOfExercise'] = parseInt(payload['timesOfExercise']);
    console.log(payload);
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const data = await addUserUseCase.execute(payload);
    const response = h.response({
      status: 'success',
      data,
    });
    response.code(201);
    return response;
  }
  async putUserHandler(req) {
    const { id } = req.auth.credentials;
    const token = req.auth.artifacts.token;
    const payload = req.payload;
    payload['sex'] = (payload['sex']==='true');
    payload['weight'] = parseInt(payload['weight']);
    payload['height'] = parseInt(payload['height']);
    const {daftar:isRegister} = req.query;
    const editUserUseCase = this._container.getInstance(EditUserUseCase.name);
    await editUserUseCase.execute(payload, id, isRegister, token);
    return {
      status: 'success',
    };
  }
  async getUserHandler(req) {
    const { id } = req.auth.credentials;
    const token = req.auth.artifacts.token;
    const editUserUseCase = this._container.getInstance(GetUserUseCase.name);
    const data = await editUserUseCase.execute(id, token);
    return {
      status: 'success',
      data,
    };
  }
}

module.exports = UserHandler;