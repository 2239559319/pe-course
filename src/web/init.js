/**
 * get function
 */
/**
 * get vue instance
 */
export function getVM() {
  return document.querySelector('.no-skin').__vue__
}
/**
 * get ajax function
 * @return {Function}
 */
export function getAjaxFn() {
  const vm = getVM()
  return vm.emitAjax
}
/**
 * get current term id
 */
export function getCurrentTermId() {
  const vm = getVM()
  return vm.currentTerm.id
}

/**
 * get
 * @param {string} teacherName
 * @param {string} studentUid
 */
export function getClassIdAndTeacherId(teacherName, studentUid) {
  const ajax = getAjaxFn()
  const path = `/api/term/${getCurrentTermId()}/student/${studentUid}/course/classes`
  return new Promise((resolve, reject) => {
    ajax({
      path,
      success(data) {
        const lists = data.data
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
