import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';


const ImageGallery = ({ data, onClick }) => (
  <ul className={styles.ImageGallery}>
    {data.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        largeImageURL={largeImageURL}        
        onClick={onClick}
        alt={tags}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
};


export default ImageGallery;