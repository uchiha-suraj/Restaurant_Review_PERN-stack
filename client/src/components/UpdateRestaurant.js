import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = () => {
  const {id} = useParams();
  let history = useHistory();
  const {restaurants} = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const[location, setLocation] = useState('');
  const[priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data.data);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    history.push("/")
  };

  return (
    <div>
      <form action = "">
        <div className = 'form-group'>
          <label htmalFor = "name" className='text-white' style = {{fontSize: "25px"}}>Name</label>
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" 
          style = {{marginTop: '15px'}}>
          <label htmlFor="location" className='text-white' style = {{fontSize: "25px"}}>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group" 
          style = {{marginTop: '15px'}}>
          <label htmlFor="price_range" className='text-white' style = {{fontSize: "25px"}}>Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
          style = {{marginTop: '10px'}}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
