import React, { Component } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import '../Styles/CreatePost.css';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description: '',
      category: '',
      portfolio_name: '',
      bio: '',
      email: '',
      contact_no: '',
      image: null,
      images: [],
      showAlert: false,
      showError: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      this.setState({ showError: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ image: reader.result, showError: false });
    };
    reader.readAsDataURL(file);
  };

  handleSubmitImage = async () => {
    const { image, images } = this.state;

    if (!image) {
      this.setState({ showError: true });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8070/images/upload', {
        image: image,
      });

      if (response.data.success) {
        this.setState({
          images: [...images, { _id: response.data._id, url: image }],
          showAlert: true,
          image: null,
        });
      } else {
        console.error('Failed to upload image:', response.data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  handleRemoveImage = async (id) => {
    const { images } = this.state;

    try {
      const response = await axios.delete(`http://localhost:8070/images/delete/${id}`);

      if (response.data.success) {
        const updatedImages = images.filter((img) => img._id !== id);
        this.setState({ images: updatedImages, showAlert: true });
      } else {
        console.error('Failed to delete image:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { topic, description, category, portfolio_name, bio, email, contact_no } = this.state;

    const formData = {
      topic,
      description,
      category,
      portfolio_name,
      bio,
      email,
      contact_no,
      images: this.state.images.map((img) => img._id),
    };

    try {
      const response = await axios.post('http://localhost:8070/post/save', formData);

      if (response.data.success) {
        this.setState({
          topic: '',
          description: '',
          category: '',
          portfolio_name: '',
          bio: '',
          email: '',
          contact_no: '',
          images: [],
          showAlert: true,
        });
      } else {
        console.error('Failed to save post:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  render() {
    const { img, title,  editingImageId } = this.state;
    const {
      topic,
      description,
      category,
      portfolio_name,
      bio,
      email,
      contact_no,
      image,
      images,
      showAlert,
      showError,
    } = this.state;

    return (
      <section>
        
        <div className='formuser'>
          
          <div className='image-container'>
            {image && <img src={image} alt='Uploaded' className='uploadPreview' />}
            <label htmlFor='uploadImage' className='uploadBox'>
              <FiUpload className='uploadIcon' />
              <input type='file' id='uploadImage' onChange={this.handleUploadImage} style={{ display: 'none' }} />
            </label>
          </div>
          <div className='form-container'>
            <h2>Create New Post</h2>
            <form className='form' onSubmit={this.onSubmit}>
              

              
              {/* Form fields */}
              {/* Topic */}
              <div className='row'>
                <div className='col-6'>
                  <label>Topic:</label>
                  <input type='text' name='topic' value={topic} onChange={this.handleInputChange} />
                </div>
                {/* Category */}
                <div className='col-6'>
                  <label>Category:</label>
                  <input type='text' name='category' value={category} onChange={this.handleInputChange} />
                </div>
              </div>
              {/* Portfolio Name */}
              <div className='row'>
                <div className='col-12'>
                  <label>Portfolio Name:</label>
                  <input type='text' name='portfolio_name' value={portfolio_name} onChange={this.handleInputChange} />
                </div>
              </div>
              {/* Bio */}
              <div className='row'>
                <div className='col-12'>
                  <label>Bio:</label>
                  <textarea name='bio' value={bio} onChange={this.handleInputChange}></textarea>
                </div>
              </div>
              {/* Description */}
              <div className='row'>
                <div className='col-12'>
                  <label>Description:</label>
                  <textarea name='description' value={description} onChange={this.handleInputChange}></textarea>
                </div>
              </div>
              {/* Email and Contact Number */}
              <div className='row'>
                <div className='col-6'>
                  <label>Email:</label>
                  <input type='email' name='email' value={email} onChange={this.handleInputChange} />
                </div>
                <div className='col-6'>
                  <label>Contact Number:</label>
                  <input type='text' name='contact_no' value={contact_no} onChange={this.handleInputChange} />
                </div>
                
              </div>
              
              {/* Upload Button */}
              <button type='button' onClick={this.handleSubmitImage}>
                Upload Image
              </button>
              <button type='submit'>Save</button>
            </form>
          </div>
          {showError && <div className='errorText'>Please select an image.</div>}
          {showAlert && <div className='alert alert-success'>Post saved successfully!</div>}
        </div>

        {/* Display Uploaded Images */}
        <div className='gallery'>
          {images.map((img) => (
            <div key={img._id} className='imageItem'>
              <img src={img.url} alt='Uploaded' className='uploadedImage' />
              <button onClick={() => this.handleRemoveImage(img._id)} className='deleteButton'>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="imageContainer">
                <form onSubmit={this.handleSubmit} className="uploadSection">
                    <label htmlFor="uploadImage" className="uploadBox">
                        {img ? <img src={img} alt="Uploaded" className="uploadPreview" /> : <FiUpload className="uploadIcon" />}
                        <input type="file" id="uploadImage" onChange={this.handleUploadImage} style={{ display: 'none' }} />
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => this.setState({ title: e.target.value })}
                        className="inputField"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        className="inputField"
                    />
                    <button type="submit" className="uploadButton">
                        Upload
                    </button>
                    {showError && (
                        <div className="errorText">
                            Please select an image.
                        </div>
                    )}
                    {showAlert && (
                        <div className="alert alert-success" role="alert">
                            Image uploaded successfully!
                        </div>
                    )}
                </form>

                <div className="gallery">
                    {images.map((image) => (
                        <div key={image._id} className="imageItem">
                            <img src={image.image} alt={image.title} className="uploadedImage" />
                            <div className="imageDetails">
                                {editingImageId === image._id ? (
                                    <form onSubmit={this.handleEditSubmit}>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                            className="editField"
                                        />
                                        <textarea
                                            value={description}
                                            onChange={(e) => this.setState({ description: e.target.value })}
                                            className="editField"
                                        />
                                        <button type="submit" className="updateButton">
                                            Save
                                        </button>
                                    </form>
                                ) : (
                                    <>
                                        <h4>{image.title}</h4>
                                        <p>{image.description}</p>
                                        <button onClick={() => this.handleDeleteImage(image._id)} className="deleteButton">
                                            Delete
                                        </button>
                                        <button onClick={() => this.handleEditClick(image._id, image.title, image.description)} className="editButton">
                                            Update
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        
      </section>
    );
  }
}

export default CreatePost;
