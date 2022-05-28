const AddUserUseCase = require("../../../applications/User/AddUserUseCase");
const EditUserUseCase = require("../../../applications/User/EditUserUseCase");

class UserHandler {
  constructor(container) {
    this._container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
    this.putUserHandler = this.putUserHandler.bind(this);
  }
  async postUserHandler(req, h) {
    const payload = req.payload;
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
    const {daftar:isRegister} = req.query;
    const editUserUseCase = this._container.getInstance(EditUserUseCase.name);
    await editUserUseCase.execute(payload, id, isRegister, token);
    return {
      status: 'success',
    };
  }
}

module.exports = UserHandler;