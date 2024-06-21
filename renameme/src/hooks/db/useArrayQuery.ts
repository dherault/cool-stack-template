import { useCallback, useEffect, useState } from 'react'
import { type Query, getDocs } from 'firebase/firestore'

import type { DatabaseResource } from '~types'

function useArrayQuery<T extends DatabaseResource>(query: Query, enabled = true) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetch = useCallback(async () => {
    if (!enabled) return

    setLoading(true)

    try {
      const querySnapshot = await getDocs(query)
      const data: T[] = []

      querySnapshot.forEach(doc => {
        data.push(doc.data() as T)
      })

      setData(data.sort((a, b) => a.createdAt < b.updatedAt ? -1 : 1))
    }
    catch (error) {
      console.error(error)
      setError(error as Error)
    }
    setLoading(false)
  }, [query, enabled])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading, error }
}

export default useArrayQuery
