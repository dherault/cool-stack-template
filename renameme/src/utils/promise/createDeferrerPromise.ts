export type DeferredPromise<T> = {
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (error: any) => void
  status: 'pending' | 'resolved' | 'rejected'
}

// A deferred promise is a promise that can be resolved or rejected from the outside
function createDeferredPromise<T>() {
  const deferredPromise: Partial<DeferredPromise<T>> = {
    status: 'pending',
  }

  deferredPromise.promise = new Promise<T>((resolve, reject) => {
    deferredPromise.resolve = (value: T) => {
      deferredPromise.status = 'resolved'
      resolve(value)
    }
    deferredPromise.reject = (error: any) => {
      deferredPromise.status = 'rejected'
      reject(error)
    }
  })

  return deferredPromise as DeferredPromise<T>
}

export default createDeferredPromise
