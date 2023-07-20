import { useState, useEffect } from 'react'
import { IResponse } from './response.interface'
import { IPerson } from './person.interface'

export const useData = () => {
  const [data, setData] = useState<IResponse | null>(null)
  const [url, setUrl] = useState(import.meta.env.VITE_SWAPI_BASE_URL as string)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async (url: string) => {
      let ignore = false
      setIsError(false)
      setIsLoading(true)

      try {
        const response = await fetch(url)
        if (!ignore) {
          const data = (await response.json()) as IResponse
          // store only the name gender and url entries in memory -- the other properties seem to be not relevant in the task
          data.results = data.results.map((item: IPerson) => ({
            name: item.name,
            gender: item.gender,
            url: item.url,
          }))
          setData(data)
        }
      } catch (error) {
        console.error(error)
        setIsError(true)
      }
      setIsLoading(false)

      return () => {
        ignore = true
      }
    }

    void fetchData(url)
  }, [url])

  return [{ data, isLoading, isError }, setUrl] as const
}
