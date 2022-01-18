import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const StarRating = ({ rating }) => {
  //rating =4
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="text-warning"><StarIcon /></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className="text-warning"><StarHalfIcon /></i>);
    } else {
      stars.push(<i key={i} className="text-warning"><StarOutlineIcon /></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;

