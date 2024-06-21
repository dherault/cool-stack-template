async function wait(duration = 1000) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, duration)
  })
}

export default wait
