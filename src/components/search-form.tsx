import { Box, TextField, Button } from '@mui/material'

interface ISearchFormProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  submitSearch: () => void
}

const SearchForm = ({ search, setSearch, submitSearch }: ISearchFormProps) => {
  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
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
        sx={{ mb: 2, maxWidth: '50ch' }}
      />
      <Button
        variant="contained"
        onClick={() => submitSearch()}
        sx={{ maxWidth: '10ch' }}
      >
        Search
      </Button>
    </Box>
  )
}

export default SearchForm
