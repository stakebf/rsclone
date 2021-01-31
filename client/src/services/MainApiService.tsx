import {idText} from 'typescript';

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

  getBoardsAll = async () => {
    return await this._getResource('boards');
  };

  getBoard = async (id: string) => {
    return await this._getResource(`boards/${id}`);
  };

  getUsersAll = async () => {
    return await this._getResource('users');
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

  postAddUsersToBoard = async (userID: string, boardID = {}) => {
    return await this._postResource(`users/${userID}/addtoboard`, boardID);
  };

  postBoard = async (data = {}) => {
    return await this._postResource('boards', data);
  };

  // Put

  _getPut = async (url: string, data = {}) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // authorization: token
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    return await response.json();
  };

  putBoard = async (data = {}, id: string) => {
    return await this._getPut(`boards/${id}`, data);
  };
}

export default MainApiService;
