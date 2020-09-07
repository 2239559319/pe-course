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

export function getClassIdAndTeacherId(teacherName, studentUid) {
  
}