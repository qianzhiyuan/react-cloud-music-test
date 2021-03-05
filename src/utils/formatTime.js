// import dayjs from "dayjs";
//
// export const formatTime = (time, type) => {
//   return dayjs(time).format(type)
// }

export const formatTimeSecond = (timeSecond, type) => {
  let result = parseInt(timeSecond)
  let str = ''
  let h = Math.floor(result / 3600)
  let m = Math.floor((result / 60 % 60))
  let s = Math.floor((result % 60))

  function fill0(val) {
    return (parseInt(val) < 10 ? '0' + val : val) || '00'
  }

  switch (type) {
    case 'hh:mm:ss':
      str = `${fill0(h)}:${fill0(m)}:${fill0(s)}`
      break
    case 'mm:ss':
      str = `${fill0(h * 60 + m)}:${fill0(s)}`
      break
    case 'ss':
      str = `${h * 60 * 60 + m * 60 + s}`
      break
    default:
      str = `${fill0(h)}:${fill0(m)}:${fill0(s)}`
  }
  return str;
}
