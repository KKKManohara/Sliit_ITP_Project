import React from 'react';
import '../Styles/home.css';
import NavBar from './NavBar';
import GalleryComponent from './Portfolio/Gallery';



const Home = () => {
  return (
    <div>
    <div className="ccontainer">
     
      {/* hero */}
      <div className="kk">
        <div className="color"></div>
      </div>
      <div className="mm">
        <div className="hero">
          <div className="contain">
            <div className="box box-1" data-text="Renji"></div>
            <div className="box box-2" data-text="Sora"></div>
            <div className="box box-3" data-text="Kaito"></div>
            <div className="box box-4" data-text="Tsuki"></div>
            <div className="box box-5" data-text="Mitsui"></div>
          </div>
        </div>
      </div>
      <div className="rr">
      <section className="Numbering_Section">
        <div className="container grid_four_column">
          <div>
            <h2 id="visitcount" className="number">0</h2>
            <p>Visit Counter</p>
          </div>
          <div>
            <h2 className="number">1500</h2>
            <p>Custom portfolio</p>
          </div>
          <div>
            <h2 className="number">250</h2>
            <p>Template Portfolio</p>
          </div>
          <div>
            <h2 className="number">98%</h2>
            <p>Customer Satisfaction</p>
          </div>
        </div>
    </section>
      </div>
      {/* hero */}
      <NavBar />

    </div>
    <GalleryComponent/>
    </div>
  );
};

export default Home;
