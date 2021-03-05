export const isIOS = () => {
  return /i(phone|pad|os)/.test(navigator.userAgent.toLowerCase())
}

export const isAndroid = () => {
  return /android|adr/.test(navigator.userAgent.toLowerCase());
}

export const isInWeChat = () => {
  return /micromessenger/.test(navigator.userAgent.toLowerCase())
}
