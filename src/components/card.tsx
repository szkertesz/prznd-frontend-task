import { FunctionComponent } from 'react'
import { IPerson } from '../api/person.interface'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

interface CardItemProps {
  data: IPerson
  index: number
}

const CardItem: FunctionComponent<CardItemProps> = ({ data, index }) => {
  return (
    <Card key={data.url}>
      <CardMedia
        sx={{ height: 240 }}
        image={`/${index % 2 === 0 ? 'mock-image.png' : 'mock-image-1.png'}`}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardItem
