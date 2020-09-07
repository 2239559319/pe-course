const {
  emitAjaxGet,
  emitAjaxPost
} = require('./ajax')

const { headers } = require('./headers')

/**
 * get current term id
 */
async function getTermId() {
  const path = '/api/terms'
  const res = await emitAjaxGet(path, headers)
  for (const term of res.data.content) {
    if (term.currentTerm === 1) return term.id
  }
}

/**
 * get classid and teacher id
 * @param {string} teacherName 
 * @param {string} studentUid
 */
async function getClassIdAndTeacherId(teacherName, studentUid) {
  const path = `/api/term/${getTermId()}/student/${studentUid}/course/classes`
  const res = await emitAjaxGet(path, headers)
  const lists = res.data
  for (const course of lists) {
    if (course.teacherName === teacherName) {
      return {
        courseClassId: course.id.toString(),
        teacherUid: course.teacherUid
      }
    }
  }
}
/**
 * choose function
 * @param {string} courseClassId
 * @param {string} teacherUid
 * @param {string} teacherName 
 * @param {string} studentUid 
 */
async function choose(courseClassId, teacherUid, teacherName, studentUid) {
  const path = '/api/courses/students'
  const data = {
    courseClassId,
    studentUid,
    teacherUid,
    teacherName
  }
  const res = await emitAjaxPost(path, data, headers)
  if (res.code === 200 && res.message === 'OK') return true
  else return false
}

async function startTimer(teacherName, studentUid, callback) {
  const { courseClassId, teacherUid } = await getClassIdAndTeacherId(teacherName, studentUid)
  let count = 1
  const timer = setInterval(async() => {
    const res = await choose(courseClassId, teacherUid, teacherName, studentUid)
    if (res === true) {
      callback('选课成功')
      clearInterval(timer)
    } else {
      callback(`已经选课${count}次`)
      count++
    }
  }, 1000)
  return timer
}

module.exports = {
  getTermId,
  getClassIdAndTeacherId,
  choose,
  startTimer
}
