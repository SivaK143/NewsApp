const API_KEY = "49fd77016f864f68b63ca5005da0bb2a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    // printArt(data.articles[0]);
    bindData(data.articles);
}

function printArt(article) {
    console.log(article.urlToImage);
}
function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const template = document.getElementById("template");
    cardContainer.innerHTML = "";
    articles.forEach(article => {
        if (article.urlToImage === null) return;
        const cardclone = template.content.cloneNode(true);
        // console.log(cardclone);
        fillDataInCard(cardclone, article);
        cardContainer.appendChild(cardclone);

    });
}

// document.querySelector
function fillDataInCard(cardclone, article) {
    const newsimg = cardclone.querySelector("#news-img")
    // console.log(newsimg);

    const newsTitle = cardclone.querySelector("#news-title");
    // console.log(newsTitle);
    const newsSource = cardclone.querySelector("#news-source");
    const newsDesc = cardclone.querySelector("#news-desc");
    // console.log(article.url);
    // newsimg.src=article.url;
    // console.log(article.urlToImage);
    // console.log(article.urlToImage);
    // console.log(article.urlToImage);
    newsimg.src = article.urlToImage;
    // console.log(articles.urlToImage);
    // console.log(newsimg);
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`
    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });

    

}

let curSelected = null;
function onNavclick(id) {

    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelected?.classList.remove("active");
    curSelected.classList.add("active");
}

const search = document.getElementById("search");
const btn = document.getElementsByClassName("search-button");
console.log(btn[0]);
// console.log(btn.textcontent);
btn[0].addEventListener("click",()=>{
    const query = search.value;
    fetchNews(query);
})




