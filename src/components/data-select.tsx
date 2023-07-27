import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TMethod } from '../api/arrange-data.hook';

interface IDataSelectProps {
  method: TMethod
  setMethod: React.Dispatch<React.SetStateAction<TMethod>>
}

export default function DataSelect({method, setMethod}: IDataSelectProps) {

  const handleChange = (event: SelectChangeEvent<TMethod>) => {
    setMethod(event.target.value as TMethod);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="data-select-label">Sort by</InputLabel>
        <Select
          labelId="data-select-label"
          id="simple-select"
          value={method}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value='az'>A-Z</MenuItem>
          <MenuItem value='za'>Z-A</MenuItem>
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
        </Select>
      </FormControl>
  );
}