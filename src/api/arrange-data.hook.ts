import { useState, useEffect } from 'react'
import { IPerson } from './person.interface'

export type TMethod = 'az' | 'za' | 'male' | 'female'

export const useArrangeData = ({datainput, method}: {datainput: IPerson[], method: TMethod}) => {
  const [arrangedData, setArrangedData] = useState<IPerson[]>([])

  useEffect(() => {
    const arrangeData = (method: TMethod) => {
      switch (method) {
        case 'az': {
          const sortedData = datainput.sort((a, b) =>
            a.name.localeCompare(b.name)
          )
          setArrangedData(sortedData)
          break
        }
        case 'za': {
          const sortedData = datainput.sort(
            (a, b) => (-1 * a.name.localeCompare(b.name))
          )
          setArrangedData(sortedData)
          break
        }
        case 'male': {
          const filteredData = datainput.filter(
            person => person.gender === 'male'
          )
          setArrangedData(filteredData)
          break
        }
        case 'female': {
          const filteredData = datainput.filter(
            person => person.gender === 'female'
          )
          setArrangedData(filteredData)
          break
        }
      }
    }
    arrangeData(method)
  }, [method, datainput])

  return { arrangedData } as const
}
