/**
 * get vue instance
 */
const vm = document.querySelector('.no-skin').__vue__
/**
 * get ajax function
 * @type {Function}
 */
const ajax = vm.emitAjax
/**
 * get current term id
 */
export function getCurrentTermId() {
  return vm.currentTerm.id
}

/**
 * 通过请求获取老师id和课程id
 * @param {string} teacherName
 * @param {string} studentUid
 */
export function getClassIdAndTeacherIdByNet(teacherName, studentUid) {
  const path = `/api/term/${getCurrentTermId()}/student/${studentUid}/course/classes`
  return new Promise((resolve, reject) => {
    ajax({
      path,
      success(data) {
        const lists = data
        for (const course of lists) {
          if (course.teacherName === teacherName) {
            resolve({
              courseClassId: course.id.toString(),
              teacherUid: course.teacherUid,
            })
          }
        }
      },
      error(data) {
        reject(data)
      },
    })
  })
}

/**
 * 通过dom获取老师和课程信息
 * 这个函数必须在选课页面进行，也就是path为/selectCourse的路由
 */
export function getClassIdAndTeacherIdByDOM(teacherName) {
  if (vm.$route.name !== 'selectCourse') {
    console.log('请在选课页面操作')
  } else {
    const lists = vm.$children[3].courseClassList
    for (const course of lists) {
      if (course.teacherName === teacherName) {
        return {
          courseClassId: course.id.toString(),
          teacherUid: course.teacherUid,
        }
      }
    }
  }
}

/**
 * 获取用户名和账号
 */
export function getUser() {
  return {
    name: vm.user.name,
    username: vm.user.username
  }
}
/**
 * 选课
 * @param {string} courseClassId 
 * @param {string} teacherUid 
 * @param {string} teacherName 
 * @param {string} studentUid 
 */
export function choose(courseClassId, teacherUid, teacherName, studentUid) {
  return new Promise((resolve, reject) => {
    ajax({
      path: '/api/courses/students',
      type: "POST",
      data: {
        courseClassId,
        teacherUid,
        teacherName,
        studentUid
      },
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

export function getHeader() {
  return {
    'Authorization': 'bearer ' + localStorage.getItem('Authorization')
  }
}