import React from "react";
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends React.Component{
    state = {
        imageRequest:'',
    };

    handleInputChange = event => {
        this.setState({ imageRequest: event.currentTarget.value.toLowerCase() });
    }

    handleImageRequest = event => {
        event.preventDefault();

        if (this.state.imageRequest.trim() === '') {
            alert('Enter the name of the picture');
            return;
        }

        this.props.onSubmit(this.state.imageRequest);
        this.setState({ imageRequest:''});
}

    render() {

       return (
     <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleImageRequest}>
            <button type="submit" className={styles.SearchFormButton} >
            <span className={styles.SearchFormButtonLabel}>Search</span>
            </button>

            <input
                className={styles.SearchFormInput}
                type="text"            
                placeholder="Search images and photos"
                value={this.state.imageRequest}
                onChange={this.handleInputChange}
            />
        </form>
    </header>   
    ) 
    }
};


Searchbar.propTypes = {  
  onSubmit: PropTypes.func,
};


export default Searchbar;