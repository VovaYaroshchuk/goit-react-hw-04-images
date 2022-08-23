import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import styles from './App.module.css';

const KEY = '28211530-9aacd352b3f11c956fdc5a9f9'

export const App = () => {
  const [imageRequest, setImageRequest] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageRequest.trim() === '') {
      return;
    }

    setLoading(true);
    fetch(`https://pixabay.com/api/?q=${imageRequest}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
      if (response.ok) {
          return response.json()
      }
      throw Error('There is no image');
  })
  .then(response => {
      if (response.totalHits - page * 12 < 12) {
          setVisibleButton(true);
      }
    if (response.hits.length === 0) {
      setVisibleButton(false);
          alert(
              'There are no images for this request, try another name'
          );
        setLoading(false);                    
          return;
      }
      setData(data.concat(response.hits));
      setLoading(false);
  })
  .catch(error => {
      setError(error.message);
      setLoading(false);
  })
  }, [imageRequest, page ]);

  const handleFormSubmit = (imageRequest) => {
    setImageRequest(imageRequest);
    setPage(1);
    setData([]);
    setVisibleButton(true);
  }

  const handleButtonClick = () => {
    setPage(page + 1);
  }

  const toggleModal = (largeImageURL) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  }

  return (
          <>
            <Searchbar onSubmit={handleFormSubmit} />
            {data.length !== 0 && (
              <ImageGallery data={data} onClick={toggleModal} />
            )}         
            <div className={styles.container}>
                {loading && <Loader />}
            </div>        
            <div className={styles.container}>
                {visibleButton && (
                <Button onClick={handleButtonClick} />
                )}
            </div>
             {showModal && (
              <Modal
                largeImageURL={largeImageURL}
                alt={imageRequest}
                onClose={toggleModal}
              />
            )}
            
          </>
        )


}

App.prototype = {
  onSubmit: PropTypes.func.isRequired
}