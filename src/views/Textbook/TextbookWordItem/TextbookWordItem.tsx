import * as React from 'react';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import './TextbookWordItem.scss';

import { Word } from '../../../types/RSLangApi';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ITextbookWordItem {
  item: Word;
}

export const TextbookWordItem = ({ item }: ITextbookWordItem) => {
  const [expanded, setExpanded] = React.useState(false);
  const {
    word,
    wordTranslate,
    image,
    textMeaning,
    textExample,
    transcription,
    textExampleTranslate,
    textMeaningTranslate,
  } = item;
  const imageUrl = `${process.env.REACT_APP_API_URL}/${image}`;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }} raised={true} className="TextbookWordItem">
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {word} {transcription}
        </Typography>
      </CardContent>
      <CardMedia component="img" height="194" image={imageUrl} alt={word} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {wordTranslate}
        </Typography>
        <Typography paragraph variant="body2" color="text.secondary">
          {parse(textExample)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {parse(textExampleTranslate)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Добавить в сложные">
          <IconButton aria-label="Добавить в сложные">
            <BookmarkAddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Добавить в изученные">
          <IconButton aria-label="Изученное">
            <BookmarkAddedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Проиграть">
          <IconButton aria-label="Проиграть">
            <VolumeUpIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{parse(textMeaning)}</Typography>
          <Typography>{parse(textMeaningTranslate)}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
