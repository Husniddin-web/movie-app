////////////// DB.JS NORMALIZE //////////////////
movies.splice(1, 100)
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

let searchBtn = $('#hero-btn'),
    inputValue = $('#srFilm')
searchBtn.addEventListener('click', () => {
    if (inputValue.value.length > 0) {
        moviesWrappper.innerHTML = ''
        let srVl = inputValue.value.toLowerCase().trim(),
            numberValue = $('#number').value,
            type = $('#select-form').value,
            searchText = new RegExp(srVl, "gi"),
            result = findFils(searchText, numberValue, type)
        $('#srFilm').value = ''
        $('#number').value = '1'
        $('#select-form').value = 'All'
        $('.infos').innerHTML = `<h3 class="info title">  ${result.length} ta kino topildi</h3>`
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
        $('.film-wrapper').appendChild(div);
    })
}
//    REDNDERlikes MOVIES //

//    ADD MOVIE  MODAL
let likes = JSON.parse(localStorage.getItem('likedFilm')) || [];
renderLikes(likes);
function addLike(id) {
    $('.film-wrapper').innerHTML = ''
    let filterLiked = allMovies.filter(e => {
        return e.id === id
    })
    if (!likes.includes(filterLiked[0])) {
        likes.push(filterLiked[0]);
    }
    else {
        alert("OLDIN QOSHILGAN")
    }
    if (likes.length > 0) {
        setLocalStroge();
        renderLikes(likes);
    }
}
setLocalStroge();
function setLocalStroge() {
    localStorage.setItem('likedFilm', JSON.stringify(likes));
}
// DELETE MOVIE FROM ON MODAL 
function deleteLikes(id) {
    let films = JSON.parse(localStorage.getItem('likedFilm'))
    $('.film-wrapper').innerHTML = ''
    $('.film-wrapper').innerHTML = ''
    let filteredLiked = films.filter(e => {
        return e.id !== id
    })
    likes = filteredLiked
    setLocalStroge();
    renderLikes(likes);
}

//    WINNDOW  ADDEVENLISTENR USE  EVENT DELAGATION  //


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
      //  GET LIKE DATA ID   AND GIVE FUNCTION OF PARAMETR
        addLike(e.target.getAttribute('data-heart'));
    }
    if (e.target.classList.contains('closed')) {
        deleteLikes(e.target.getAttribute('data-close'))    // GET CLOSE ICON DATA ID  AND GIVE FUCTI0ON OF PARAMETR
    }




    if (e.target.classList.contains('adds')) {
        $('.films-box').classList.remove('modal-swipe') // SEE LIKE MOVIE ON MODAL 
    }
    if (e.target.classList.contains('clos')) {
        $('.films-box').classList.add('modal-swipe')  // CLOSE MODAL OF LOVE MOVIE
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







//  NIGHT   LIGHT MOOD///
$('.nav__search-nght-light').addEventListener('click', (e) => {
    let target = e.target;
    if (target.classList.contains('night-moon')) {
        $('.moon').innerHTML = '<span class="bi bi-moon-stars  light-moon"></span>'
        darkMode()
    } else {
        $('.moon').innerHTML = '<span class="bi bi-moon-stars-fill  night-moon"></span>'
        lightMode()
    }
})




function darkMode() {
    document.body.classList.add('dark');
    localStorage.setItem('mode', 'dark');
}
function lightMode() {
    document.body.classList.remove('dark');
    localStorage.setItem('mode', 'light');
}





//  LANGUAGE/=======
(function () {
    let theme = localStorage.getItem('mode');
    document.body.classList.add(theme)
}())


//  NIGHT   LIGHT MOOD///



function lang() {
    const language = {
        uz: {
            home: 'Bosh menyu',
            loves: 'Sevimliklar',
            login: 'Kirish',
            search: 'Qidrish',
            result: ' ta kino topildi'
        },
        eng: {
            home: 'Home page',
            loves: 'Loves',
            login: 'Login',
            search: 'Search',
            result: ' found movies',
        },
        ru: {
            home: 'Главное меню',
            loves: 'Избранное',
            login: 'Войти',
            search: 'поиск',
            result: ' фильм найден',
        }
    }
    localStorage.setItem('langs', JSON.stringify(language))
}
lang();






let languages = JSON.parse(localStorage.getItem('langs'))

let selectForm = $('#lang')
selectForm.addEventListener('change', e => {
    localStorage.setItem('selectedLanguage', e.target.value);
    changeLanguage(languages[e.target.value]);
})
function changeLanguage(language) {
    let navItem = $$('.title');
    let arr = [];
    for (let item in language) {
        arr.push(language[item]);
    }
    navItem.forEach((e, i) => {
        e.textContent = arr[i]
    })
}


(function () {
    let select = localStorage.getItem('selectedLanguage')
    let langs = JSON.parse(localStorage.getItem('langs'))
    const selected = langs[select]

    changeLanguage(selected)
}())