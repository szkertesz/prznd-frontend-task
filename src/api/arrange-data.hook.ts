import { useMemo } from 'react'
import { IPerson } from './person.interface'

export type TMethod = 'az' | 'za' | 'male' | 'female'

export const useSortedData = ({
  inputData,
  method,
}: {
  inputData: IPerson[]
  method: TMethod
}) => {
  const sortData = useMemo(() => {
    switch (method) {
      case 'az': {
        const sortedData = inputData.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
        return sortedData
        break
      }
      case 'za': {
        const sortedData = inputData.sort((a, b) =>
          b.name.localeCompare(a.name)
        )
        return sortedData
        break
      }
      case 'male': {
        const filteredData = inputData.filter(
          person => person.gender === 'male'
        )
        return filteredData
        break
      }
      case 'female': {
        const filteredData = inputData.filter(
          person => person.gender === 'female'
        )
        return filteredData
        break
      }
    }
  }, [inputData, method])

  return sortData
}
// const [sortedData, setSortedData] = useState<IPerson[]>([])
// export const useSortedData = ({inputData, method}: {inputData: IPerson[], method: TMethod}) => {
//   const [sortedData, setSortedData] = useState<IPerson[]>([])

//   useEffect(() => {
//     const sortData = (method: TMethod) => {
//       console.log('sortData hook runs')
//       switch (method) {
//         case 'az': {
//           const sortedData = inputData.sort((a, b) =>
//             a.name.localeCompare(b.name)
//           )
//           setSortedData(sortedData)
//           break
//         }
//         case 'za': {
//           const sortedData = inputData.sort(
//             (a, b) => b.name.localeCompare(a.name)
//           )
//           setSortedData(sortedData)
//           break
//         }
//         case 'male': {
//           const filteredData = inputData.filter(
//             person => person.gender === 'male'
//           )
//           setSortedData(filteredData)
//           break
//         }
//         case 'female': {
//           const filteredData = inputData.filter(
//             person => person.gender === 'female'
//           )
//           setSortedData(filteredData)
//           break
//         }
//       }
//     }
//     sortData(method)
//   }, [method])

//   return {sortedData} as const
// }
