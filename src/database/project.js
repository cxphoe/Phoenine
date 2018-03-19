class ProjectDatabase {
  constructor() {
    this.currentID = '10000'
    this.database = {
      'Phoenine': {
        length: 4,
        comments: {
          '1': {
            user: 'phoenine',
            content: 'testing comment...',
            createdAt: new Date(2008, 1, 10),
          },
          '2': {
            user: '张三',
            content: '感觉还行',
            createdAt: new Date(2018, 1, 10),
            replys: [ '3', '4' ],
          },
          '3': {
            user: '李四',
            replyTargetID: '2',
            content: '真的还行吗？',
            createdAt: new Date(2018, 2, 10),
          },
          '4': {
            user: 'bob',
            replyTargetID: '2',
            content: '应该还行吧？',
            createdAt: new Date(2018, 2, 18),
          },
        },
      },
    }
  }

  static instance(...args) {
    return new this(...args)
  }

  nextAvailableID() {
    this.currentID = (++this.currentID).toString()
    return this.currentID
  }

  addComment(projectName, options) {
    let ds = this.getDataset(projectName)
    let cmts = ds.comments
    let ID = this.nextAvailableID()
    let targetID = options.replyTargetID

    let data = {
      user: options.user || ID,
      content: options.content,
      createdAt: options.date,
    }

    if (targetID) {
      data.replyTargetID = targetID
      let rs = cmts[targetID].replys
      rs ? rs.push(ID) : (cmts[targetID].replys = [ID])
    }
    cmts[ID] = data
    ds.length++
  }

  getDataset(projectName) {
    return this.database[projectName]
      || this.createDataset(projectName)
  }

  createDataset(projectName) {
    let ds = this.database[projectName] = {
      length: 0,
      comments: {},
    }
    return ds
  }
}

const projectDatabase = ProjectDatabase.instance()

export {
  projectDatabase,
}
