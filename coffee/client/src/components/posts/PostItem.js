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
  post: { _id, text, name, avatar, user, likes, comments, date, averageReview, totalReview, address, suburb},
  showActions
}) => {

  const hasValue = el => {
    return el = el ? el: "no value yet"
  }
  return (
  <div className='post bg-white p-1 my-1'>
    <div>
      <p>shop name: <Link to={`/shops/${_id}`}> {text}</Link></p>
      <p className='post-date'>
        created cafe on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      <div><b>average rate:</b> {hasValue(averageReview)}</div>
      <div><b>total review number:</b> {hasValue(totalReview)}</div>
      <div><b>address:</b> {hasValue(address)}</div>
      <div><b>suburb:</b> {hasValue(suburb)}</div>
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
