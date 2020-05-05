import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost, auth }) => {
  const [text, setText] = useState('');
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('');

  const isAdmin = auth.user && auth.user.email === 'admin@admin.com';

  return auth.isAuthenticated && isAdmin && (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>add coffee shop</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text, address, suburb });
          setText('');
          setAddress('');
        }}
      >

        <input 
          type='text' 
          name='address' 
          value={address} 
          required 
          placeholder='address'
          onChange={e => setAddress(e.target.value)}
        />

        <input 
          type='text' 
          name='suburb' 
          value={suburb} 
          required 
          placeholder='suburb'
          onChange={e => setSuburb(e.target.value)}
        />

        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
