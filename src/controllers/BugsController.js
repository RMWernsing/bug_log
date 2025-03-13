
import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugsService.js";

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:bugId', this.getBugbyId)
      .put('/:bugId', this.editBug)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:bugId', this.deleteBug)
      .post('', this.createBug)


  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async createBug(request, response, next) {
    try {
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async getAllBugs(request, response, next) {
    try {
      const bugs = await bugsService.getAllBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async getBugbyId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bug = await bugsService.getBugById(bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async editBug(request, response, next) {
    try {
      const bugData = request.body
      const bugId = request.params.bugId
      const bug = await bugsService.editBug(bugData, bugId)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  /**
 * @param {import("express").Request} request
 * @param {import("express").Response} response
 * @param {import("express").NextFunction} next
 */
  async deleteBug(request, response, next) {
    try {
      const userInfo = request.userInfo
      const bugId = request.params.bugId
      const bug = await bugsService.deleteBug(bugId, userInfo)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

}