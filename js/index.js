////////////// DB.JS NORMALIZE //////////////////
movies.splice(100)
let allMovies = movies.map((e) => {
    return {
        title: e.title,
        year: e.year,
        category: e.categories,
        id: e.imdbId,
        rating: e.imdbRating,
        time: `${Math.trunc(e.runtime / 60)} soat ${e.runtime % 60} daqiqa`,
        language: e.language,
        youtube: `https://www.youtube.com/embed/${e.youtubeId}`,
        summary: e.summary,
        smallImg: e.smallThumbnail,
        bigImg: e.bigThumbnail,
    }
})
//======= VARIEBLES ======// 
let moviesWrappper = $('.all-movies-wrapper');
let optionForm = $('#select-form')


//======= VARIEBLES ======// 











// ======= RENDER FUNCTION =======//
render(allMovies, moviesWrappper);
function render(data, append) {

    data.forEach(e => {
        const card = createElement('div', 'all-movies card',
            `
        <span  class="heart like" data-heart=${e.id}><i  data-heart=${e.id} class="bi bi-heart-fill like"></i></span>
        <span class="   badge rounded bg-success text-light year">${e.year}</span>
        <img src='${e.smallImg}' alt="rasm" class="card-img">
        <div class="card-body">
            <h3 class="card-title"> ${e.title} </h3>
            <ul class="card-list">
                <li class="card-item">Rating:${e.rating}</li>
                <li class="card-item">Catogry:${e.category}</li>
                <li class="card-item">Davomiyligi:${e.time}</li>
            </ul>
            <ul class="card-btn m-0 p-0">
                <li><a href="${e.youtube}" class="btn-see">YOUTUBE</a></li>
                <li><button  data-btn=${e.id} class="btn-read">READ ME</button></li>
            </ul>
        </div>

        `
        )
        card.dataset.id = e.id
        append.appendChild(card);
    });
}



// ======= RENDER FUNCTION =======//







// ======= CATOGRY RENDER ==== ///
let categoryFilms = []
categoryFilm(allMovies);
function categoryFilm(data) {
    data.filter(e => {
        e.category.filter(elements => {
            if (!categoryFilms.includes(elements)) {
                categoryFilms.push(elements)
            }

        })
    })
}
categoryFilms.sort()
renderCategory(categoryFilms)
function renderCategory(data) {
    data.forEach(e => {
        const list = createElement('option', 'item-c', e)
        optionForm.appendChild(list);
    })
}

// ======= CATOGRY RENDER ==== ///




//====== SEARCH FILM IN HEADER  =======//
function findFilm(str) {
    return allMovies.filter((e) => {
        return e.title.match(str);
    })
}


let searchFilm = $('#searchFilm');
searchFilm.addEventListener('keyup', e => {
    moviesWrappper.innerHTML = ''
    let searchValue = e.target.value.toLowerCase().trim();
    let searchText = new RegExp(searchValue, "gi")
    console.log(searchText);
    let result = findFilm(searchText);
    render(result, moviesWrappper);
})

$('.menue').addEventListener('click', () => {
    moviesWrappper.innerHTML = ''
    render(allMovies, moviesWrappper);
    searchFilm.value = ''
    $('.infos').innerHTML = ''
})
//====== SEARCH FILM IN HEADER  =======//




// ====== SEARCH FILM MENUE ======//


function findFils(str, rat, ctg) {
    return allMovies.filter((e) => {
        return e.title.match(str) && e.rating >= rat && e.category.includes(ctg);
    })
}






let searchBtn = $('#hero-btn');
let inputValue = $('#srFilm')
searchBtn.addEventListener('click', () => {
    if (inputValue.value.length > 0) {
        moviesWrappper.innerHTML = ''
        let srVl = inputValue.value.toLowerCase().trim();
        let numberValue = $('#number').value;
        let type = $('#select-form').value;
        let searchText = new RegExp(srVl, "gi")
        let result = findFils(searchText, numberValue, type);
        $('#srFilm').value = ''
        $('#number').value = '1'
        $('#select-form').value = 'All'
        $('.infos').innerHTML = `<h3 class="info">  ${result.length} ta malumot topildi</h3>`
        render(result, moviesWrappper);
    } else {
        alert('KINO NOMI TANLANG')
    }

})



//========== MODAL CONTENT  ==========///


function findModal(id) {
    let filtered = allMovies.filter(e => {
        return e.id == id
    })
    let item = filtered[0]
    $('.modal-box').innerHTML = ''
    const itemModal = createElement('div', 'modal-box', `


    <div class="modal-logo">
                        <img class='modal-img' src="${item.bigImg}" alt="picture">
                    </div>
                    <div class="modal-text">
                        <ul class="modal-list">
                            <li class="modal-item">Year: <strong class="year-item">${item.year}-yil</strong> </li>
                            <li class="modal-item">Davomiyligi: <strong class="dav-item">${item.time}</strong> </li>
                            <li class="modal-item"> Til : <strong class="til-item">Uzbek</strong></li>
                            <li class="modal-item ">Izoh: <span class="summary">${item.summary}</span>
                            </li>
                            <li class="modal-item ">Rating: <span class="rating-item">${item.rating}</span><span class="star"><i
                                        class="bi bi-star-fill star"></i></span>
                        </ul>
                    </div>
    `)
    $('.modal-box').appendChild(itemModal);
}
//    REDNDERlikes MOVIES //
function renderLikes(data) {
    data.forEach(e => {
        const div = createElement('div', 'film', `

        <span class="YOP"><i class="bi bi-x closed" data-close="${e.id}"></i></span>
        <div class="film-img">
            <img    class="film-imgs" src="${e.bigImg}" alt="">
        </div>
        <div class="modal-text">
            <ul class="modal-list">
                <li class="modal-item">Year: <strong class="year-item">${e.year}-yil</strong> </li>
                <li class="modal-item">Davomiyligi: <strong class="dav-item">${e.time}</strong> </li>
                <li class="modal-item"> Til : <strong class="til-item">Uzbek</strong></li>
                <li class="modal-item ">Rating: <span class="rating-item">${e.rating}</span><span class="star"><i
                            class="bi bi-star-fill star"></i></span>
            </ul>
        </div>
        `)
        div.dataset.dbid = `${e.id}`
        $('.film-wrapper    ').appendChild(div);
    })
}
//    REDNDERlikes MOVIES //






likes = [];
function addLike(id) {
    $('.film-wrapper').innerHTML = ''
    let filterLiked = allMovies.filter(e => {
        return e.id === id
    })
    console.log((filterLiked[0]));
    if (!likes.includes(filterLiked[0])) {
        likes.push(filterLiked[0]);
    }
    else {
        alert("OLDIN QOSHILGAN")
    }
    if (likes.length > 0) {
        renderLikes(likes);
    }
}
function deleteLikes(id) {
    $('.film-wrapper').innerHTML = ''
    let sl = likes.filter(e => {
        return e.id !== id
    })
    likes.length=0 
}





window.addEventListener('click', e => {
    let readBtn = e.target
    if (readBtn.classList.contains('btn-read')) {
        $('.modal-wrapper').classList.remove('modal-swipe')
        findModal(e.target.getAttribute('data-btn'))
    }
    $('.btnModal').addEventListener('click', (e) => {
        $('.modal-wrapper').classList.add('modal-swipe');
    })




    if (e.target.classList.contains('like')) {
        console.log(e.target.getAttribute('data-heart'));
        addLike(e.target.getAttribute('data-heart'));
    }
    if (e.target.classList.contains('closed')) {
        deleteLikes(likes, e.target.getAttribute('data-close'))
        console.log(e.target.getAttribute('data-close'));
    }





    if (e.target.classList.contains('adds')) {
        $('.films-box').classList.remove('modal-swipe')
    }
    if (e.target.classList.contains('clos')) {
        $('.films-box').classList.add('modal-swipe')
    }
})



















//======= NAV BAR ======/////
let bar = $('.menue-bar')
bar.addEventListener('click', () => {
    if (bar.innerHTML == '<i class="bi bi-list"></i>') {
        $('.nav__search-list').setAttribute('class', 'nav__search-list ')
        bar.innerHTML = '<i class="bi bi-x-square"></i>'
    } else if (bar.innerHTML == '<i class="bi bi-x-square"></i>') {
        bar.innerHTML = '<i class="bi bi-list"></i>'
        $('.nav__search-list').setAttribute('class', 'nav__search-list swipeTop')
    }
})
//======= NAV BAR ======/////
