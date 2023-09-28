const background = document.getElementById('modal-background');
const modalContainer = document.getElementById('modal-container');
let currentMovie = {}

function backgroundClickHandler(){
    overlay.classList.remove('open');
}

function closeModal(){
    overlay.classList.remove('open');
}

function addCurrentmovieTolist(){
    if (isMovieAlreadyOnist(currentMovie.imdbID)){
        notie.alert({type: 'error', text: 'Filme já adicionado'});
        return;
    }
    addToList(currentMovie);
    updateUI(currentMovie);
    updateLocalStorage();
    closeModal();
}

function createModal(data){
    currentMovie = data;
    modalContainer.innerHTML=`
        <h2 id="movie-title">${data.Title}-${data.Yaer}</h2>
        <section id="modal-body">
            <img 
                id="movie-poster"
                src="${data.Poster}" 
                alt="Poster do fime" />
            <div id="movie-info">
                <div id="movie-plot">
                    <h3>${data.Plot}.</h3>                           
                </div>
                <div id="movie-cast">
                    <h4>Elenco</h4>
                    <h5>${data.Actors}</h5>                              
                </div>
                <div id="movie-genre">
                    <h4>Gênero</h4>
                        <h5>${data.Genre}</h5></p>  
                </div>
            </div>
        </section>
        <section id="modal-footer">
            <button id="add-to-list" onclick='{addCurrentmovieTolist()}'>Adicionar à lista</button>
        </section>`;
}

background.addEventListener('click', backgroundClickHandler);