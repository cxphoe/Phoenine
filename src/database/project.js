import CommentDatabase from './comment'

class ProjectDatabase extends CommentDatabase {
  constructor() {
    super()
    this.database = {
      'Phoenine': {
        commentCurID: 4,
        commentAmount: 4,
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
            createdAt: new Date(2018, 2, 10, 1, 3, 30),
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
}

export default ProjectDatabase.instance()
