class MainApiService {
  _API_URL = 'url_our_api';

  async getResource(url: string) {
    const res = await fetch(url);

    return await res.json();
  }

  // Get

  _getResource = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        // authorization: token
      }
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  };

  getBoards = async () => {
    return await this._getResource('boards');
  };

  // Post

  _postResource = async (url: string, data = {}) => {
    const response: any = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // authorization: token
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      if (Object.keys(data).length) throw await response.json();
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  };

  postUserToLogin = async (data = {}) => {
    return await this._postResource('login', data);
  };

  postUserToRegister = async (data = {}) => {
    return await this._postResource('users', data);
  };

  postBoards = async (data = {}) => {
    return await this._postResource('boards', data);
  };
}

export default MainApiService;
