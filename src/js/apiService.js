const MY_KEY = '5891845-66174e067b1f9940a42957e0b';

export default {
    searchQuery: '',
    page: 1,

    async fetchImages() {
        const BASE_LINK = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_KEY}`;

        const response = await fetch(BASE_LINK);
        const images = await response.json();
        this.incrementPage();

        return images;
    },

    incrementPage() {
        this.page += 1;
    },

    resetPage() {
        this.page = 1;
    },

    get query() {
        return this.searchQuery;
    },

    set query(newQuery) {
        this.searchQuery = newQuery;
    },
}


// fetchImages() {
//         const BASE_LINK = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${MY_KEY}`;

//         return fetch(BASE_LINK)
//             .then(r => {
//                 if (r.ok) {
//                     this.incrementPage();
//                     return r.json();
//                 }
                    
//                 throw new Error('Error fetching data');
//             })
//             .catch(error => { console.error(error) });
//     },