export function setupCounter(element, clear) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    clear.innerHTML = `clear count`
  }
  const clearCounter = (clear) => {
    setCounter(clear)
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  clear.addEventListener('click', () => clearCounter(0))
  setCounter(0)
}
