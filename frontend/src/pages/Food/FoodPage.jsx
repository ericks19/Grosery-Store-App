import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './foodPage.module.css';
import { getById } from '../../services/foodServices';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';

const FoodPage = () => {
  const [food, setFood] = useState({})
  const { id } = useParams();
  const {addToCart} = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food)
    navigate('/cart');
  }

  useEffect(() => {
    getById(id).then(setFood);
  }, [id])

  return (
    <>
      {!food? <NotFound message="Food Not Found!" linkText="Back To Homepage"/>
      : (
        <div className={classes.container}>
          <img
          className={classes.image}
          src={`/foods/${food.imageUrl}`}
          alt={food.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span className={`${classes.favorite} ${food.favorite? "": classes.not}`}>
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>
            <div className={classes.origin}>
              {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>))}
            </div>
            <div className={classes.tags}>
              {food.tags && (
                  <Tags
                  tags={food.tags.map(tag => ({name: tag}))}
                  forFoodPage={true}
                  />
              )}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      )}
    </>
  )
}

export default FoodPage
