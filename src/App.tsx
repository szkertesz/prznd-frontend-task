import { Box, Button, ButtonBase, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useData } from './api/data.hook'
import { IPerson } from './api/person.interface'

function App() {
  const [{ data, isLoading, isError }, startFetch] = useData()
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [storeData, setStoreData] = useState<IPerson[] | []>([])
  const [displayData, setDisplayData] = useState<IPerson[] | []>([])
  const baseUrl = import.meta.env.VITE_SWAPI_BASE_URL as string

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
    // initial loading case:
    if (page === 1 && !search) {
      startFetch(baseUrl)
    }
    if (!data) return
    // check if store already includes at least one of the items of the new data batch and
    // merge the new data only if it doesn't
    if (
      data.results.length &&
      !storeData.some(item => item.name === data.results[0].name)
    ) {
      setStoreData([...storeData, ...data.results])
    }
    // change the data source in case of search
    setDisplayData(search ? data.results : storeData)
    // setDisplayData(arrangedData)
  }, [data, storeData])

  // return from search results if field gets empty
  useEffect(() => {
    if (search.length === 0) {
      setDisplayData(storeData)
    }
  }, [search])

  return (
    <>
      <Typography variant="h2" component="h1">
        Star Wars Character Search
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="character-search"
          label="Search character"
          variant="standard"
          type="search"
          value={search}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value)
          }}
          sx={{ mb: 2, width: '50ch' }}
        />
        <Button variant="contained" onClick={() => submitSearch()}>
          Search
        </Button>
      </Box>

      {isError && (
        <p>
          Something went wrong <br />
          <small>check the console for details</small>
        </p>
      )}

      {isLoading && <p>Loading ...</p>}
      {search && !data?.count && <p>No search result found :-\</p>}

      {displayData && (
        <ul>
          {displayData.map(item => (
            <li key={item.url}>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
      {data?.count && <button onClick={() => loadMoreData()}>Load more</button>}
    </>
  )
}

export default App
