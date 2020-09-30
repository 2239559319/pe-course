/**
 * 在console中使用的代码
 */
function getVM() {
  return document.querySelector('.no-skin').__vue__
}
function getAjaxFn() {
  const vm = getVM()
  return vm.emitAjax
}
function getCurrentTermId() {
  const vm = getVM()
  return vm.currentTerm.id
}
function getClassIdAndTeacherIdByDOM(teacherName) {
  const vm = getVM()
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
function getUser() {
  const vm = getVM()
  return {
    name: vm.user.name,
    username: vm.user.username
  }
}
function choose(courseClassId, teacherUid, teacherName, studentUid) {
  const ajax = getAjaxFn()
  return new Promise((resolve, reject) => {
    ajax({
      path: '/api/courses/students',
      type: 'POST',
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
;((teacherName) => {
  const { courseClassId, teacherUid } = getClassIdAndTeacherIdByDOM(teacherName)
  const { username } = getUser()
  let count = 1
  const timer = setInterval(async() => {
    try {
      const data = await choose(courseClassId, teacherUid, teacherName, username)
      if (data.code === 200 && data.message === 'OK') {
        console.log('选课成功')
        clearInterval(timer)
      } else {
        console.log(`${count}次选课`)
        count++
      }
    } catch(err) {
      console.log(err)
    }
  }, 1000)
})('夏廷富')
