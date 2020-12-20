class MainApi {
  constructor(options) {
    this.options = options;
  }

  getUser(token) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      });
  }

  getSavedNews(token) {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      });
  }

  saveArticle(token) {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      });
  }

  deleteArticle(token) {
    return fetch(`${this.options.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      });
  }


  logIn(values) {
    const { email, password } = values;
    return fetch(`${this.options.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error('Unsuccessful login');
        }
      })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        return data.token;
      })
  }

  register(values) {
    const { email, password, username } = values;
    // return Promise.resolve(true);
    return fetch(`${this.options.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "name": username
      })
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
          // { data: { email, name, _id }}
        } else {
          throw new Error('Unsuccessful registration');
        }
      });
  }

  logOut() {
    
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.ws.news.students.nomoreparties.site"
});

export default mainApi;
