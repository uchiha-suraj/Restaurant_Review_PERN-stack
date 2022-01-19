import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from "./StarRating";

const RestaurantList = (props) => {

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id
      }))
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  }

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    {console.log('restaurant ==> ', restaurant)}
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </>
    );
  };

  return (
    <div className = 'list-group'>
      <table className="table table-hover">
        <thead>
          <tr className="bg-primary">
            <th scope = 'col' className='text-white'>Restaurant</th>
            <th scope = 'col' className='text-white'>Location</th>
            <th scope = 'col' className='text-white'>Price Range</th>
            <th scope = 'col' className='text-white'>Rating</th>
            <th scope = 'col' className='text-white'>Edit</th>
            <th scope = 'col' className='text-white'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map((restaurant) => {
            return (
              <tr
                onClick={() => handleRestaurantSelect(restaurant.id)} 
                className="bg-secondary" 
                key = {restaurant.id}
                style = {{
                  cursor: 'pointer', 
                  border: '1px solid black',
                  opacity: '0.8'
                }}
              >
                <td className='text-white'>{restaurant.name}</td>
                <td className='text-white'>{restaurant.location}</td>
                <td className='text-white'>{'$'.repeat(restaurant.price_range)}</td> 
                <td className='text-white'>{renderRating(restaurant)}</td>
                <td>
                  <button 
                    className="btn btn-warning"
                    onClick = {(e) => handleUpdate(e, restaurant.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button 
                    className="btn btn-danger"
                    onClick = {(e) => handleDelete(e, restaurant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
