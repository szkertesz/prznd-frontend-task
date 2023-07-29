import { FunctionComponent } from 'react'
import { IPerson } from '../api/person.interface'
import { Card } from '@mui/material'

interface CardItemProps {
  data: IPerson
}

const CardItem: FunctionComponent<CardItemProps> = ({ data }) => {
  return (
    <Card key={data.url}>
      <span>{data.name}</span>
    </Card>
  )
}

export default CardItem
