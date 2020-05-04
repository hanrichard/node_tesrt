import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment, auth }) => {
  const [text, setText] = useState('');
  const [review, setReview] = useState('');

  return auth.isAuthenticated && (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a coffee review</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text, review });
          setText('');
          setReview('');
        }}
      >
        <input 
          type='number' 
          name='review' 
          value={review} 
          required 
          placeholder='review'
          onChange={e => setReview(e.target.value)}
          />
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
