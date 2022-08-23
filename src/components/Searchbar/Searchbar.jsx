import React from "react";
import {  useState } from "react";
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

function Searchbar ({onSubmit}) {
    const [imageRequest, setImageRequest] = useState('');

    const handleInputChange = event => {
        setImageRequest(event.target.value.toLowerCase());
    }

    const handleImageRequest = event => {
        event.preventDefault();

        if (imageRequest.trim() === '') {
            alert('Enter the name of the picture');
            return;
        }

        onSubmit(imageRequest);
        setImageRequest('');
    }


    return (
        <header className={styles.Searchbar}>
           <form className={styles.SearchForm} onSubmit={handleImageRequest}>
               <button type="submit" className={styles.SearchFormButton} >
               <span className={styles.SearchFormButtonLabel}>Search</span>
               </button>
   
               <input
                   className={styles.SearchFormInput}
                   type="text"            
                   placeholder="Search images and photos"
                   value={imageRequest}
                   onChange={handleInputChange}
               />
           </form>
       </header>   
       ) 
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}


export default Searchbar;