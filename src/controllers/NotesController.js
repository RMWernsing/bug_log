import BaseController from "../utils/BaseController.js";

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .post('', this.createNote)
  }

  /**
* @param {import("express").Request} request
* @param {import("express").Response} response
* @param {import("express").NextFunction} next
*/
  async createNote(request, response, next) {

  }
}