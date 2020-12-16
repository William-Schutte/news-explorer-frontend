
class NewsApi {
  constructor(cool) {
    this.newsUrl = cool;
  }

  getNews({ keyword }) {
    return fetch(this.newsUrl)
  }
}