import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const {addRestaurants} = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post('/', {
        name: name,
        location: location,
        price_range: priceRange,
      });
      console.log(response);
      addRestaurants(response.data.data.restaurant);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className = 'mb-4'>
      <form action = "">
        <div className="form-group row">
          <div className="col-4">
            <input 
              className='form-control' 
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              type = 'text' 
              placeholder = 'name' 
            />
          </div>
          <div className="col-3">
            <input 
              className='form-control' 
              value = {location}
              onChange = {(e) => setLocation(e.target.value)}
              type = 'text' 
              placeholder = 'location' 
            />
          </div>
          <div className="col-3">
            <select 
            className=' col-12 custom-select my-1 mr-sm-2'
            value = {priceRange}
            onChange = {(e) => setPriceRange(e.target.value)}
            style = {{cursor: 'pointer'}}
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col">
            <button 
              className="btn btn-primary"
              type = 'submit'
              onClick = {handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRestaurant
