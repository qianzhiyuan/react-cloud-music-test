function debounce(fn, ms) {
  let timeoutId
  return function () {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, arguments)
    }, ms)
  }
}

export {
  debounce
}