import React from "react";
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';


function ImageGalleryItem({ webformatURL, largeImageURL, alt, onClick }) {
  return (
      <>
          <li className={styles.ImageGalleryItem} onClick={() => onClick(largeImageURL)}>
            <img className={styles.ImageGalleryItemImage} src={webformatURL} alt={alt} />
        </li>
</>
                    
        )  
};


ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

    export default ImageGalleryItem;