function fetchImages(searchResult) {
    const key = '28211530-9aacd352b3f11c956fdc5a9f9'
    return fetch(`https://pixabay.com/api/?q=${searchResult}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
            if (response.ok) {
            return response.json()
            
}
            else {
                throw new Error('Network response was not ok.')
            }
})}

const api = {
    fetchImages
}

export default api;
