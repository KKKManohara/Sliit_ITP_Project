import React, { Component } from 'react';
import axios from 'axios';

export default class PortfolioAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      selectedPostImages: [], // To store images of the selected post
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get('/posts').then((res) => {
      if (res.data.success) {
        this.setState({
          posts: res.data.existingPosts,
        });
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/post/delete/${id}`).then((res) => {
      alert('Delete Successfully!');
      this.retrievePosts();
    });
  };

  // Function to handle click on a post row
  handlePostClick = async (postId) => {
    try {
      const response = await axios.get(`/post/images/${postId}`);
      if (response.data.success) {
        this.setState({
          selectedPostImages: response.data.images,
        });
      }
    } catch (error) {
      console.error('Error fetching post images:', error);
    }
  };

  render() {
    const { posts, selectedPostImages } = this.state;

    return (
      <div className='container'>
        <h2>All Posts</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Portfolio Name</th>
              <th>Bio</th>
              <th>Description</th>
              <th>Category</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} onClick={() => this.handlePostClick(post._id)}>
                <td>{index + 1}</td>
                <td>
                  {post.image && ( // Display the first image of the post
                    <img
                      src={post.image.image}
                      alt='Portfolio'
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  )}
                </td>
                <td>{post.portfolio_name}</td>
                <td>{post.bio}</td>
                <td>{post.description}</td>
                <td>{post.category}</td>
                <td>{post.email}</td>
                <td>{post.contact_no}</td>
                <td>
                  <button className='btn btn-warning'>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </button>
                  &nbsp;
                  <button className='btn btn-danger' onClick={() => this.onDelete(post._id)}>
                    <i className='far fa-trash-alt'></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display selected post images */}
        {selectedPostImages.length > 0 && (
          <div>
            <h3>Images Uploaded by User</h3>
            <div className='image-gallery'>
              {selectedPostImages.map((image) => (
                <img
                  key={image._id}
                  src={image.image}
                  alt='Uploaded'
                  style={{ maxWidth: '200px', maxHeight: '200px', margin: '10px' }}
                />
              ))}
            </div>
          </div>
        )}

        <button className='btn btn-success'>
          <a href='/add' style={{ textDecoration: 'none', color: 'white' }}>
            Create
          </a>
        </button>
        <button className='btn btn-success'>
          <a href='/addimage' style={{ textDecoration: 'none', color: 'white' }}>
            Add Image
          </a>
        </button>
        <button className='btn btn-success'>
          <a href='/UserUi' style={{ textDecoration: 'none', color: 'white' }}>
            User View Portfolio
          </a>
        </button>
      </div>
    );
  }
}
