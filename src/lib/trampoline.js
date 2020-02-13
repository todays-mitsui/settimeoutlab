module.exports = fn => {
  return async (...args) => {
    let result = await fn(...args)

    while (typeof result === 'function') {
      result = await result()
    }

    return result
  }
}
