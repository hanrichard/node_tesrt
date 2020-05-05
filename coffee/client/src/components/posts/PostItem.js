import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  // // addLike,
  // // removeLike,
  // deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, averageReview, totalReview},
  showActions
}) => {
  return (
  <div className='post bg-white p-1 my-1'>
    <div>
      
      <p>shop name: <Link to={`/shops/${_id}`}> {text}</Link></p>
      <p className='post-date'>
        created cafe on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      <div>average rate: {averageReview}</div>
      <div>total review number: {totalReview}</div>
    </div>
  </div>
  )
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  // addLike: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired,
  // deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  // { addLike, removeLike, deletePost }
)(PostItem);
