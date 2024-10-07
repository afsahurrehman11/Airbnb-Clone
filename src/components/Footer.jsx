import { useState } from "react";
import { FaFacebook, FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
import "../Styles/Footer.css";
import footer_content from "../footer";

const Footer = () => {
  const [data] = useState(footer_content);
  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(data[0])[0]
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="footer">
      <div className="upper-footer">
        <h1>Inspiration for future getaways</h1>
        <div className="top-head">
          {data.map((categoryObj, index) => {
            const mainCategory = Object.keys(categoryObj)[0];
            return (
              <div
                key={index}
                className={`category ${
                  selectedCategory === mainCategory ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(mainCategory)}
              >
                <p>{mainCategory}</p>
              </div>
            );
          })}
        </div>

        <div className="row-1">
          {data
            .filter(
              (categoryObj) => Object.keys(categoryObj)[0] === selectedCategory
            )
            .map((filteredCategory) => {
              const categoryItems = filteredCategory[selectedCategory];
              return categoryItems.map((item, index) => (
                <div key={index}>
                  <span>{item.span}</span>
                  <p>{item.p}</p>
                </div>
              ));
            })}
        </div>
      </div>

      <div
        style={{
          borderBottom: "1px solid rgb(197, 194, 194)",
          marginLeft: "50px",
        }}
      ></div>

      <div className="lower-footer">
        <div className="col-1">
          <p
            className="heading"
            style={{
              textDecoration: "none",
            }}
          >
            Support
          </p>
          <p>
            <a href="">Help Center</a>
          </p>
          <p>
            <a href="">AirCover</a>
          </p>
          <p>
            <a href="">Anti-discrimination</a>
          </p>
          <p>
            <a href="">Disability support</a>
          </p>
          <p>
            <a href="">Cancellation options</a>
          </p>
          <p>
            <a href="">Report neighborhood concern</a>
          </p>
        </div>
        <div className="col-2">
          <p
            className="heading"
            style={{
              textDecoration: "none",
            }}
          >
            Hosting
          </p>
          <p>
            <a href="">Airbnb your home</a>
          </p>
          <p>
            <a href="">AirCover for Hosts</a>
          </p>
          <p>
            <a href="">Hosting resources</a>
          </p>
          <p>
            <a href="">Community forum</a>
          </p>
          <p>
            <a href="">Hosting responsibly</a>
          </p>
          <p>
            <a href="">Airbnb-friendly apartments</a>
          </p>
          <p>
            <a href="">Join a free Hosting class</a>
          </p>
        </div>
        <div className="col-3">
          <p
            className="heading"
            style={{
              textDecoration: "none",
            }}
          >
            Airbnb
          </p>
          <p>
            <a href="">Newsroom</a>
          </p>
          <p>
            <a href="">New features</a>
          </p>
          <p>
            <a href="">Careers</a>
          </p>
          <p>
            <a href="">Investors</a>
          </p>
          <p>
            <a href="">Gift Card</a>
          </p>
          <p>
            <a href="">Airbnb.org emergency stays</a>
          </p>
        </div>
      </div>

      <div id="hr"></div>

      <div className="lowest-footer">
        <p className="lowest-right">
          © 2024 Airbnb, Inc. · Terms . Sitemap . Privacy . Your Privacy Choices
        </p>
        <div className="lowest-right">
          <FaGlobe />
          <p style={{ marginLeft: "14px" }}>English (US)</p>
          <p style={{ marginLeft: "20px" }}> $USD </p>
          <a href="https://www.facebook.com/airbnb" target="_blank">
            <FaFacebook size={20} style={{ marginLeft: "20px" }} />
          </a>
          <a href="https://twitter.com/airbnb" target="_blank">
            <FaTwitter size={20} style={{ marginLeft: "12px" }} />
          </a>
          <a href="https://www.instagram.com/airbnb" target="_blank">
            <FaInstagram size={20} style={{ marginLeft: "12px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
