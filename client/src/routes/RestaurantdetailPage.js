import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantdetailPage = () => {
  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='text-white'>
      {selectedRestaurant && <StarRating rating = {3} />}
    </div>
  )
}

export default RestaurantdetailPage
