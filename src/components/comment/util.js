// find conversation source comment
const findConvrSrcCmt = function (cmt, curUser, tgtUser, commentList) {
  let tgtID = cmt.replyTargetID
  if (!tgtID || commentList[tgtID].user !== tgtUser) {
    return cmt
  }
  let src = commentList[tgtID]
  return findConvrSrcCmt(src, tgtUser, curUser, commentList)
}

const findAllConvr = function (cmt, user, replier, commentList) {
  let replys = cmt.replys
  if (!replys) {
    return [cmt]
  }

  let tgtReplys = replys.filter(rid => {
    return commentList[rid].user === replier
  })

  return [cmt].concat(...tgtReplys.map(rid => {
    let replyCmt = commentList[rid]
    return findAllConvr(replyCmt, replier, user, commentList)
  }))
}

const commentComp = function (cmt1, cmt2) {
  return cmt1.createdAt - cmt2.createdAt
}

const getWholeConvr = function (id, commentList) {
  let cur = commentList[id]
  let curUser = cur.user
  let tgtID = cur.replyTargetID
  let tgt = commentList[tgtID]
  let tgtUser = tgt.user
  let src = findConvrSrcCmt(tgt, tgtUser, curUser, commentList)
  let srcReplier = src.user === curUser ? tgtUser : curUser
  let convr = findAllConvr(src, src.user, srcReplier, commentList)
  return convr.sort(commentComp)
}

export {
  getWholeConvr,
}
