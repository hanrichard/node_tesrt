import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  const [sortValue, setSortValue] = useState("highest")
  const handleChange = (e) => {
    setSortValue(e.target.value)
  }
  useEffect(() => {
    getPosts();
  }, [getPosts, sortValue]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Cafes</h1>
      <p className='lead'>
        Welcome to the coffee review
      </p>
      <PostForm />
      <select onChange={handleChange} value={sortValue}>
          <option value="highest">highest rate</option>
          <option value="loweset">loweset rate</option>
        </select>
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
