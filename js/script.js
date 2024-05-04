const getTopStories = async () => {
  const response = await fetch(
    "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl"
  );
  if (!response.ok && response.status === "404") {
    console.log("запрос составлен неправильно!");
  }
  const api = await response.json();
  console.log(api.results);
  let article = `<div class="article">
            <div class="left-part">
              <div class="author">
                <ul class="ul">
                  <li class="li">
                    <img class="li-img" src="" alt="" width="20px" /></li>
                  </li>
                  <li class="li">
                    <h3></h3>
                  </li>
                  <li class="grey"></li>
                </ul>
              </div>
              <div class="content">              
                <p class="title" id = "title"></p>
                <p class="summary" id = "summary"></p>
              </div>
              <div class="topic">
                <button class="topic-button"></button>
                <h3 class="grey">12 min read</h3>
                <h3 class="grey">Selected for you</h3>
              </div>
            </div>
            <div class="right-part">
              <img src="/images/Img.png" alt="" />
            </div>
          </div>`;

  const articles = document.getElementById("articles");

  api.results.forEach((elem) => {
    let newArticle = article.replace(
      `id = "title">`,
      `id = "title">${elem.title}`
    );
    newArticle = newArticle.replace(
      `id = "summary">`,
      `id = "summary">${elem.abstract}`
    );

    newArticle = newArticle.replace(
      `<div class="right-part">
              <img src="/images/Img.png" alt="" />
            </div>`,
      `<div class="right-part">
              <img src="${elem.multimedia[0].url}" alt="" />
            </div>`
    );

    newArticle = newArticle.replace(
      `<li class="li">
                    <h3></h3>
                  </li>`,
      `<li class="li">
                    <h3>${elem.byline}</h3>
                  </li>`
    );

    newArticle = newArticle.replace(
      `<li class="grey"></li>`,
      `<li class="grey">${elem.published_date.slice(0, 10)}</li>`
    );

    newArticle = newArticle.replace(
      `<button class="topic-button"></button>`,
      `<button class="topic-button">${elem.section.toUpperCase()}</button>`
    );

    console.log(elem.section);
    articles.innerHTML += newArticle;
  });
};

document.addEventListener("keydown", function (event) {
  if (event.code == "Enter") {
    getTopStories();
  }
});
