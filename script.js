const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const movieListContainer = document.getElementById('movie-list');
const key = '4d7a82f';

let movieList = JSON.parse(localStorage.getItem("movieList"))?? [];

async function searchButtonClickHandler(){
    try {
        let url = `https://www.omdbapi.com/?apikey=${key}&t=${movieNameParemeterGenerator()}${movieYaerParemeterGenerator()}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log('data: ',data);
            if (data.Error) {
                throw new Error('filme não encontrado');
            }
            createModal(data);
        overlay.classList.add('open');
    }   catch (error) {
        notie.alert({type: 'error',text: error.message});
        console.log(movieNameParemeterGenerator());
    }
}

function movieNameParemeterGenerator(){
    if (movieName.value ==='') {
        throw new Error('O nome do filme deve ser informado');
    }
    return movieName.value.split(' ').join('+');
}

function movieYaerParemeterGenerator(){
    if (movieYear.value ==='') {
        return '';
    }
    if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
        throw new Error('Ano do filme invalido.')
    }
    return `&y=${movieYaer.value}`;
}

function addToList(movieObject){
    movieList.push(movieObject);
}

function isMovieAlreadyOnist(id){
    function doesThisBelongYoThisMovie(movieObject){
        return movieObject.imdbID === id;
    }
    return Boolean(movieList.find(doesThisBelongYoThisMovie));
}

function updateUI(movieObject) {
    movieListContainer.innerHTML+=`<article id='movie-card-${movieObject.imdbID}'>
        <img src="${movieObject.Poster}" alt="Poster do filme ${movieObject.Title}">
        <button class ="remove-button" onclick="{removeFilmFronList('${movieObject.imdbID}')}"><i class="bi bi-recycle"></i>Remover</button>
    </article>`
}

function removeFilmFronList(id){
    notie.confirm({
        text:'Deseja remover o filme da lista',
        submitText: 'Sim',
        cancelText: 'Não',
        submitCallback: function remove(){
            movieList = movieList.filter(movie => movie.imdbID !== id);
            document.getElementById(`movie-card-${id}`).remove();
            updateLocalStorage();
        }
    });
}

function updateLocalStorage(){
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
    updateUI(movieInfo);
}

searchButton.addEventListener('click', searchButtonClickHandler);