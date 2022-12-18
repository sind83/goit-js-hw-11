import axios from "axios";

const serchBtn = document.querySelector('button');
const serchInput = document.querySelector("input");

const KEY = '32168922-28fbc94a479cf5f4ad5662ce8';
const url = 'https://pixabay.com/api/';
const options = "image_type=photo&orientation=horizontal&safesearch=true"

serchBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    console.log("Yeah");
    querry = serchInput.value;
    console.log(querry);
    serchPicture(url, KEY, querry).then(console.log).catch(console.log);
})
// image_type = photo & orientation=horizontal & safesearch=true
const serchPicture = async (url, KEY, querry) => {
    const search = await axios.get(`${url}?key=${KEY}&q=${querry}&${options}`);
    console.log(`${url}?key=${KEY}&q=${querry}&${options}`);
    return search;
}

//  <div class="photo-card">
//     <img src="" alt="" loading="lazy" />
//     <div class="info">
//         <p class="info-item">
//             <b>Likes</b>
//         </p>
//         <p class="info-item">
//             <b>Views</b>
//         </p>
//         <p class="info-item">
//             <b>Comments</b>
//         </p>
//         <p class="info-item">
//             <b>Downloads</b>
//         </p>
//     </div>
// </div> 