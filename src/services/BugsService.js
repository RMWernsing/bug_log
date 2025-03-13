import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async getAllBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs
  }

  async getBugById(bugID) {
    const foundBug = await dbContext.Bugs.findById(bugID).populate('creator')

    if (foundBug == null) {
      throw new BadRequest(`invalid bug id: ${bugID}`)
    }

    return foundBug
  }

  async editBug(bugData, bugId) {
    const bugToUpdate = await this.getBugById(bugId)
    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    bugToUpdate.save()
    return bugToUpdate
  }

  async deleteBug(bugId, userInfo) {
    const bug = await this.getBugById(bugId)

    if (bug.creatorId != userInfo.id) {
      throw new Forbidden('YOU CANNOT DELETE THIS!!!')
    }

    await bug.deleteOne()
    return `your bug was deleted.`
  }

}

export const bugsService = new BugsService()