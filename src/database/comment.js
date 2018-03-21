export default class CommentDatabase {
  constructor() {
    this.database = {}
  }

  static instance(...args) {
    let res = new this(...args)
    console.log(res)
    return res
  }

  nextCommentID(key) {
    return ++this.database[key].commentCurID
  }

  addComment(key, data) {
    let ds = this.getDataset(key)
    let cmts = ds.comments
    let ID = this.nextCommentID(key)
    let targetID = data.replyTargetID

    let comment = {
      user: data.user || ID.toString(),
      content: data.content,
      createdAt: data.date,
    }

    if (targetID) {
      comment.replyTargetID = targetID
      let rs = cmts[targetID].replys
      rs ? rs.push(ID) : (cmts[targetID].replys = [ID])
    }
    cmts[ID] = comment
    ds.commentAmount++
  }

  getDataset(key) {
    return this.database[key]
      || this.createDataset(key)
  }

  createDataset(key, extendAttrs) {
    let ds = this.database[key] = {
      commentCurID: 0,
      commentAmount: 0,
      comments: {},
      ...extendAttrs,
    }
    return ds
  }
}
