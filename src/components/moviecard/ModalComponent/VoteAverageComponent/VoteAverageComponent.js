import {React} from 'react'
import './VoteAverageComponent.css'
import ratingstar from '../../../../images/rating-star.png'

const VoteAverageComponent = (props) => {
  return (
    <>
     {props.element?.vote_average >= 1 && (
                <div className="modal-rating">
                  <img
                    src={ratingstar}
                    alt="Rating Star"
                    className="rating-star-image"
                  />
                  <div className="vote-rating">
                    {props.element?.vote_average.toFixed(1)}
                  </div>
                </div>
              )}
    
    </>
  )
}

export  {VoteAverageComponent}