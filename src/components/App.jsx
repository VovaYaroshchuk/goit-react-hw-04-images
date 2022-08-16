import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

import styles from './App.module.css';

const KEY = '28211530-9aacd352b3f11c956fdc5a9f9'

export class App extends Component {
  state = {    
    imageRequest: '',
    data: [],
    loading: false,
    showModal: false,
    visibleButton: false,
    largeImageURL: '',
    page: 0,
    error:null,
  };
  
  componentDidUpdate(prevProps, prevState) {
        if (prevState.page!==this.state.page||prevState.imageRequest !== this.state.imageRequest) {
            
            this.setState({loading:true})
            fetch(`https://pixabay.com/api/?q=${this.state.imageRequest}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw Error('There is no image');
                })
                .then(response => {
                    if (response.totalHits - this.state.page * 12 < 12) {
                        this.setState({ visibleButton: false });
                    }
                  if (response.hits.length === 0) {
                      this.setState({ visibleButton: false });
                        alert(
                            'There are no images for this request, try another name'
                        );
                      this.setState({ loading: false });                      
                        return;
                    }
                    this.setState(prevState => ({
                        data: [...prevState.data, ...response.hits],
                        loading: false,
                    }));
                })
                .catch(error => this.setState({ error }));                
        }
    }
  

  handleFormSubmit = imageRequest => {
    
    this.setState({ imageRequest, data:[], page: 1,visibleButton:true });
}

  handleButtonClick = () => {
    this.setState(prevState=>({page:prevState.page+1}))
  }

  toggleModal = largeImageURL => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL,
    }));
  };
  
  render() {
    
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.data.length !== 0 && (
          <ImageGallery data={this.state.data} onClick={this.toggleModal} />
        )}         
        <div className={styles.container}>
            {this.state.loading && <Loader />}
        </div>        
        <div className={styles.container}>
            {this.state.visibleButton && (
            <Button onClick={this.handleButtonClick} />
            )}
        </div>
         {this.state.showModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            alt={this.state.imageRequest}
            onClose={this.toggleModal}
          />
        )}
        
      </>
    )
  }

}