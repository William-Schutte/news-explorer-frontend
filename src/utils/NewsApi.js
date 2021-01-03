import moment from 'moment';
import { SEARCH_TIMEFRAME, NEWS_AUTH_KEY, NEWS_PROXY } from '../utils/configData.json';

class NewsApi {
  constructor(newsUrl, apiKey) {
    this.newsUrl = newsUrl;
    this.apiKey = apiKey;
  }

  _generateUrl(keyword) {
    const searchTerm = encodeURI(keyword);
    let today = moment().format('YYYY-MM-DD');
    let lastWeek = moment().subtract(SEARCH_TIMEFRAME, 'days').format('YYYY-MM-DD');

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
  }
}

const newsApi = new NewsApi(NEWS_PROXY, NEWS_AUTH_KEY);

export default newsApi;
