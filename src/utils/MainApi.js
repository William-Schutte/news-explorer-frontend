class MainApi {
  constructor(options) {
    this.options = options;
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
        return data.user;
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
