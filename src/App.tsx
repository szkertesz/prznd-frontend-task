import { Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useData } from './api/data.hook'
import { IPerson } from './api/person.interface'
import SearchForm from './components/search-form'
import { TMethod, useSortedData } from './api/arrange-data.hook'
import DataSelect from './components/data-select'

function App() {
  const [{ data, isLoading, isError }, startFetch] = useData()
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [method, setMethod] = useState<TMethod>('az')
  const [storeData, setStoreData] = useState<IPerson[]>([])
  const baseUrl = import.meta.env.VITE_SWAPI_BASE_URL as string
  const sortedData = useSortedData({
    inputData: search ? data.results : storeData,
    method,
  })

  const loadMoreData = () => {
    if (data?.next) {
      startFetch(`${baseUrl}?page=${page + 1}`)
      setPage(page + 1)
    }
  }

  const submitSearch = () => {
    startFetch(`${baseUrl}?search=${search}`)
  }

  useEffect(() => {
    // initial loading case
    startFetch(baseUrl)
  }, [])

  useEffect(() => {
    if (!data) return
    if (
      // search results won't be merged into storeData
      !search &&
      // merge the fetched data into store only if the store doesn't include its first item already
      !storeData.some(item => item.name === data.results[0].name)
    ) {
      setStoreData(store => [...store, ...data.results])
    }
  }, [data])

  return (
    <>
      <Container>
        <Typography variant="h2" component="h1">
          Star Wars Character Search
        </Typography>

        <SearchForm
          search={search}
          setSearch={setSearch}
          submitSearch={submitSearch}
        />

        <DataSelect method={method} setMethod={setMethod} />

        {isError && (
          <p>
            Something went wrong <br />
            <small>check the console for details</small>
          </p>
        )}

        {isLoading && <p>Loading ...</p>}

        {search && !data?.count && <p>No search result found :-\</p>}

        {sortedData && (
          <ul>
            {sortedData.map(item => (
              <li key={item.url}>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        )}
        {data?.count && !search && (
          <button onClick={() => loadMoreData()}>Load more</button>
        )}
      </Container>
    </>
  )
}

export default App
