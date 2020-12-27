import moment from 'moment';

class NewsApi {
  constructor(newsUrl, apiKey) {
    this.newsUrl = newsUrl;
    this.apiKey = apiKey;
  }

  _generateUrl(keyword) {
    const searchTerm = encodeURI(keyword);
    let today = moment().format('YYYY-MM-DD');
    let lastWeek = moment().subtract(7, 'days').format('YYYY-MM-DD');

    const uri = [
      "q=" + searchTerm,
      "from=" + lastWeek,
      "to=" + today,
      "pageSize=100",
      "apiKey=" + this.apiKey,
    ];

    return uri.join("&");
  }

  getNews(keyword) {
    return fetch(this.newsUrl + this._generateUrl(keyword))
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return { error: err }
      });
  }
}

const newsApi = new NewsApi('https://nomoreparties.co/news/v2/everything?', '6762f5fdcafa45af81a68adb26a92e43');

export default newsApi;
