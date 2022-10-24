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
//////////////////////  RENDER FUNCTION //////////////////////////////////////
// render(allMovies)
$('.all-movies-wrapper').innerHTML='<span class="loader"></span>'
setTimeout(() => {
    $('.all-movies-wrapper').innerHTML=''
    render(allMovies)
}, 1500);
function render(data = []) {
    data.forEach(e => {
        const card = createElement('div'
            , "all-movies card ",

            `
        <span class="heart"><i class="bi bi-heart like"></i></span>
        <span class="   badge rounded bg-danger text-light year">${e.year}</span>
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
                                    <li><button class="btn-read">READ ME</button></li>
                                </ul>
                            </div>
        `)
        card.dataset.dbid = e.id
        $('.all-movies-wrapper').appendChild(card)
    });
}
// ============= CATEGORY DYNAMIC OPTION==========////
let typeFilm = []
function dynamicCategory(data) {
    data.forEach(e => {
        e.category.forEach(e => {
            if (!typeFilm.includes(e)) {
                typeFilm.push(e);
            }
        })
    })
}
dynamicCategory(allMovies)


typeFilm.forEach(e => {
    const option = createElement('option', 'option', e);
    $('#select-form').appendChild(option)
})
// ============= CATEGORY DYNAMIC OPTION==========////









////////////////////// SEARCH FILM ///////////////////////
function findFilm(str) {
    return allMovies.filter(e => {
        return e.title.match(str)
    })
}
let searchFilm = $('#searchFilm');
findFilmTitle(searchFilm);


function findFilmTitle(data) {
    data.addEventListener('keyup', (e) => {
        $('.all-movies-wrapper').innerHTML = ''
        let inputValue = data.value.toLowerCase();
        let searchText = new RegExp(inputValue, "gi");
        let searchResult = findFilm(searchText)
        render(searchResult)
    
    }
    )
}
////////////////////// SEARCH FILM  HEADER BY INPUT END ///////////////////////







////////////////////// SEARCH FILM  HERO BY INPUT  ///////////////////////
function findFilmRatCtg(str, rat, ctg) {
    return allMovies.filter(e => {
        return e.title.match(str) && e.rating >= rat && e.category.includes(ctg)
    })
}
let btn = $('#hero-btn')
btn.addEventListener('click', () => {
    $('.all-movies-wrapper').innerHTML = '<span class="loader"></span>'
    let inputValue = $('#srFilm').value.toLowerCase();
    let number = $('#number').value;
    let ctgs = $('#select-form').value
    let searchText = new RegExp(inputValue, "gi");
    let searchResult = findFilmRatCtg(searchText, number, ctgs)
    setTimeout(() => {
        $('.all-movies-wrapper').innerHTML =''
        $('.infos').innerHTML = `<h2 class="info">${searchResult.length} ta kino topildi</h2>`
        render(searchResult)
        $('#srFilm').value='';
        $('#number').value='1'
    }, 1000);
}
)
////////////////////// SEARCH FILM  HERO BY INPUT  END  ///////////////////////

//////awesdzxxsw`=======MENUE ========////////
$('.menue').addEventListener('click', () => {
    $('#searchFilm').value=''
    $('.all-movies-wrapper').innerHTML = '<span class="loader"></span>'
    setTimeout(() => {
        $('.all-movies-wrapper').innerHTML =''
        render(allMovies)
    }, 1000);
})
//======= NAV BAR ======/////
let bar = $('.menue-bar')
bar.addEventListener('click', () => {
    if (bar.innerHTML == '<i class="bi bi-list"></i>') {
        $('.nav__search-list').setAttribute('class', 'nav__search-list')
        bar.innerHTML = '<i class="bi bi-x-square"></i>'
    } else if (bar.innerHTML == '<i class="bi bi-x-square"></i>') {
        bar.innerHTML = '<i class="bi bi-list"></i>'
        $('.nav__search-list').setAttribute('class', 'nav__search-list swipeTop')
    }
})
//======= NAV BAR ======/////




//===== LIKE MOVIEE ==/////
let wrapper = $('.all-movies-wrapper')
let span = $('.heart')
wrapper.addEventListener('click', e => {
    let heart = e.target
    if (heart.className == 'bi bi-heart like') {
        heart.className = "bi bi-heart-fill like"
        $('.plus').textContent++
    } else if (heart.className == "bi bi-heart-fill like") {
        heart.className = "bi bi-heart like"
        $('.plus').textContent--
    }
})
//===== LIKE MOVIEE ==/////




// ====READ ME=====///
let idArr=[]
let btnRead = $('.btn-read')
wrapper.addEventListener('click', (e) => {
    let btn = e.target.className
    if (btn == 'btn-read') {
        console.log(btn.parentNode);
        $('.modal-wrapper').classList.remove('modal-swipe')
    }
})













// ====== MODAL =====/////
let modal = $('#modal')
console.log(modal);
    let close = $('#modal-btn')
close.addEventListener('click', () => {
    modal.classList.add('modal-swipe')
});

let modalContent=$('.modal-content')
function readMe(data) {
    data.forEach(e=>{
         let id =e.id
    })

}
readMe(allMovies)
// ====== MODAL =====/////
