import { FunctionComponent } from 'react'
import { IPerson } from '../api/person.interface'
import CardItem from './card'
import { Box } from '@mui/material'

interface CardListProps {
  data: IPerson[]
}

const CardList: FunctionComponent<CardListProps> = ({ data }) => {
  return (
    <Box
      component="ul"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(288px, 1fr))',
        gap: '1rem',
        pl: 0,
      }}
    >
      {data.map((item, index) => (
        <CardItem data={item} index={index} />
      ))}
    </Box>
  )
}

export default CardList
