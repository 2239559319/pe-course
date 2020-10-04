export {
  app_key,
  app_secret,
  emitAjaxGet,
  emitAjaxPost,
  chooseByNet,
  getClassIdAndTeacherId,
  getSign,
  getTermId,
  getTimestamp,
  startTimer
} from './util/index'

export {
  choose as chooseByDom,
  getAjaxFn,
  getClassIdAndTeacherIdByDOM,
  getClassIdAndTeacherIdByNet,
  getCurrentTermId,
  getHeader,
  getUser,
  getVM
} from './web/init'