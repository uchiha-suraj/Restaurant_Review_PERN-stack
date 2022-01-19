import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  console.log('id', id);
  console.log('location', location);
  console.log('history', history);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      console.log('response ==> ', response);
      history.push("/");
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-2">
      <form action = "">
        <div className="from-row">
          <div className="form-group col-8 text-light">
            <label htmlFor="name" style = {{fontSize: "25px"}}>Name</label>
            <input 
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              id = "name"
              placeholder = "Name"
              type = "text"
              className = "form-control" 
            />
          </div>
          <div className="form-group col-4 text-light" style = {{marginTop: '10px'}}>
            <label htmlFor="name" style = {{fontSize: "25px"}}>Rating</label>
            <select
              value = {rating}
              onChange = {(e) => setRating(e.target.value)}
              id = 'rating'
              className = 'custom-select' 
              style = {{marginLeft: '30px', cursor: 'pointer'}}
            >
              <option disabled>Rating</option>
              <option value = "1">1</option>
              <option value = "2">2</option>
              <option value = "3">3</option>
              <option value = "4">4</option>
              <option value = "5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group text-light">
          <label htmlFor="name" style = {{fontSize: "25px"}}>Review</label>
          <textarea
            value = {reviewText}
            onChange = {(e) => setReviewText(e.target.value)}
            id = "review"
            className = "form-control"
          ></textarea>
        </div>
        <button
          type = "submit"
          className = "btn btn-primary"
          onClick = {handleSubmitReview}
          style = {{marginTop: '10px'}}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddReview
