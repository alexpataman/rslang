import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

interface ITextbookCategoryItem {
  id: number;
  img: string;
}

export const TextbookCategoryItem = (props: ITextbookCategoryItem) => {
  const { id, img } = props;
  const title = `Категория #${id + 1}`;
  const link = `/textbook/category/${id}`;
  const image = `${process.env.REACT_APP_API_URL}/${img}`;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={link}>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
