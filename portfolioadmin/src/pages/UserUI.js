import React, { Component } from 'react';
import '../Styles/useraddimage.css';
// import '../Styles/addimage.css';
import cover from '../images/c.jpg'
import profile from '../images/pro.jpg'


class AddImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            enlargedImage: null
        };
    }

    handleImageClick = (image) => {
        this.setState({ enlargedImage: image });
    };

    handleCloseEnlarged = () => {
        this.setState({ enlargedImage: null });
    };

    fetchImages = async () => {
        try {
            const response = await fetch("http://localhost:8070/images");
            if (response.ok) {
                const data = await response.json();
                this.setState({ images: data.data });
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    componentDidMount() {
        this.fetchImages();
    }

    render() {
        const name = "Kavinda Manohara";
        const roles = " Graphic designer"; // Example roles
        const bio = "Hi, I'm Kavinda, a passionate graphic designer specializing in logos, branding, and digital illustrations.";
        const description = "With a keen eye for aesthetics and a commitment to creativity, I collaborate closely with clients to bring their ideas to life visually. Whether you're a startup looking to establish your brand identity or an established business seeking a fresh perspective, I'm here to deliver impactful designs tailored to your needs. Let's work together to create something remarkable!";
        const { images, enlargedImage } = this.state;

        return (
            <div id="about">
                <div className="hero-section" style={{ position: 'relative' }}>
                    <div className="cover-image" style={{ position: 'relative' }}>
                        <img src={cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="text-overlay" style={{ position: 'absolute', top: '-40px', left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', textAlign: 'center' }}>
                            <h1>Hi, I am <br /> {name}</h1>
                            <div>
                                I am a {roles}
                            </div>
                        </div>
                    </div>
                    <div className="profile-details" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                        <div className="profile-image">
                            <img src={profile} alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                    </div>
                </div>
                <div className='bioDescription'>
                    <h5>Bio</h5>
                    <p>{bio}</p>
                    <h5>Description</h5>
                    <p>{description}</p>
                </div>
                <div className="imageContainer">
                    <div className="gallery">
                        {images.map((image, index) => (
                            <div
                                key={image._id}
                                className="imageItem"
                                onClick={() => this.handleImageClick(image)}
                            >
                                <img src={image.image} alt={image.title} className="uploadedImage" />
                                <div className="imageDetails">
                                    <h4>{image.title}</h4>
                                    <p>{image.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Render enlarged image */}
                    {enlargedImage && (
                        <div className="enlargedContainer" onClick={this.handleCloseEnlarged}>
                            <div className="enlargedContent">
                                <img src={enlargedImage.image} alt={enlargedImage.title} className="enlargedImage" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default AddImage;
