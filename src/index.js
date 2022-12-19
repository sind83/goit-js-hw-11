import axios from "axios";
import { Notify } from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

Notify.init({
    fontSize: '22px',
    width: '400px',
    distance: '110px',
    clickToClose: true,
    cssAnimationStyle: 'zoom',
    position: 'center-top'
})

const serchBtn = document.querySelector('button');
const loadMoreBtn = document.querySelector('button.load-more__button');
const serchInput = document.querySelector("input");
const gallery = document.querySelector('ul.gallery');
const areaOfButton = document.querySelector('.load-more');

const KEY = '32168922-28fbc94a479cf5f4ad5662ce8';
const url = 'https://pixabay.com/api/';
const options = "image_type=photo&orientation=horizontal&safesearch=true"
const infoMessage = "We're sorry, but you've reached the end of search results."
const perPage = 40;
let page = 1;
let nextPictures;
let querry = '';
let loadedPictures = 0;
let galler = new SimpleLightbox('.gallery .photo-card a', { captionPosition: 'outside', captionsData: 'alt', captionDelay: '250' });

serchBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    gallery.innerHTML = '';
    nextPictures = '';
    page = 1;
    loadedPictures = 0;
    querry = serchInput.value;

    serchPicture(url, KEY, querry).then((pictures) => {
        if (pictures.data.hits.length == 0) {
            areaOfButton.classList.add('hide')
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else {
            const quantityOfPictures = pictures.data.hits.length;
            nextPictures = pictures;
            generateGallery(quantityOfPictures, pictures);
            const foundedPictures = pictures.data.totalHits;
            galler.refresh();
            // console.log("Nowa galeria: ", galler);
            if (foundedPictures > 450) {
                Notify.success(`Hooray! We found over 450 images.`)
            } else {
                Notify.success(`Hooray! We found ${pictures.data.totalHits} images.`)
            }
            if (loadedPictures >= pictures.data.totalHits) {
                areaOfButton.classList.add('hide');
                Notify.info(infoMessage);
            } else {
                areaOfButton.classList.remove('hide');
            }
        }
    }).catch(console.log);
})


const serchPicture = async (url, KEY, querry) => {
    const search = await axios.get(`${url}?key=${KEY}&q=${querry}&${options}&per_page=${perPage}&page=${page}`);
    //console.log(`${url}?key=${KEY}&q=${querry}&${options}&per_page=${perPage}&page=${page}`);
    return search;
}

const generateGallery = (numbersOfPictures, pictures) => {
    let couterOfPictures = loadedPictures;
    for (let i = 0; i < numbersOfPictures; i++) {
        const { webformatURL, likes, views, comments, downloads, tags, largeImageURL } = pictures.data.hits[i];
        const imgSrc = "./images/icons.svg#";
        gallery.innerHTML +=
            `
            <li class="photo-card">
                <a href= ${largeImageURL}>
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" >
                </a>
                        <div class="info">
                        
                            <p class="info-item">
                           
                            <b>Likes: </b> ${likes}
                            </p>
                            <p class="info-item">
                           
                                <b>Views: </b>${views}
                            </p>
                            <p class="info-item">
                           
                                <b>Comments: </b>${comments}
                            </p>
                            <p class="info-item">
                           
                                <b>Downloads: </b>${downloads}
                            </p>
                        </div>
            </li>
            `;
        couterOfPictures = i + 1;
    }

    loadedPictures += couterOfPictures;


}
// let gallerys = new SimpleLightbox('.gallery .photo-card a', { captionPosition: 'outside', captionsData: 'alt', captionDelay: '250' });
// console.log("Nowa galeria: ", gallerys);

loadMoreBtn.addEventListener("click", () => {
    page++;
    serchPicture(url, KEY, querry).then((pictures) => {
        const quantityOfPictures = pictures.data.hits.length;
        nextPictures = pictures;
        generateGallery(quantityOfPictures, pictures)
        galler.refresh();
        // console.log("Nowa galeria: ", galler);
        if (loadedPictures >= pictures.data.totalHits) {
            areaOfButton.classList.add('hide');
            Notify.info(infoMessage);
        }
    }).catch(console.log);
})
