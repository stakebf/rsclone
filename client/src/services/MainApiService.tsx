class MainApiService {
  _API_URL = 'http://localhost:4000';

  async getResource(url: string) {
    const res = await fetch(url);

    return await res.json();
  }

  // 404, 401 - unautozed, 500 - bad request, 403 - forbidden, 
  // Get

  _getResource = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        // authorization: token
      }
    });
    // console.log('response', response);
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
  }
  
  getBoardById = async (id:string) => {
    return await this._getResource(`/boards/${id}`);
  };
  
  getUserById = async (id:string) => {
    return await this._getResource(`/users/${id}`);
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

  postBoard = async (data = {}) => {
    return await this._postResource('boards', data);
  };

  postColumn = async (boardId:string, data = {}) => {
    return await this._postResource(`/boards/${boardId}/columns`, data);
  };

  postTask = async (columnId:string, data = {}) => {
    return await this._postResource(`/${columnId}/tasks`, data);
  };

  postTodos = async (columnId:string, taskId:string, data = {}) => {
    return await this._postResource(`/${columnId}/tasks/${taskId}/todos`, data);
  };

  postTag = async (columnId:string, taskId:string, data = {}) => {
    return await this._postResource(`/${columnId}/tasks/${taskId}/tags`, data);
  };

  postComment = async (columnId:string, taskId:string, data = {}) => {
    return await this._postResource(`/${columnId}/tasks/${taskId}/comments`, data);
  };

  postAttachUserToTask = async (userId:string, data = {}) => {
    return await this._postResource(`/users/${userId}/addtotask`, data);
  };

  postAddTodo = async (columnId:string, taskId:string, todosId:string, data = {}) => {
    return await this._postResource(`/${columnId}/tasks/${taskId}/todos/${todosId}/todo`, data);
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

  putUser = async (userId:string, data = {}) => {
    return await this._getPut(`/users/${userId}`, data);
  };

  putBoard = async (data = {}, id: string) => {
    return await this._getPut(`boards/${id}`, data);
  };

  renamePutColumn = async (boardId:string, columnId:string, data = {}) => {
    return await this._getPut(`/boards/${boardId}/columns/${columnId}`, data);
  };

  putTaskData = async (columnId:string, taskId:string, data = {}) => {
    return await this._getPut(`/${columnId}/tasks/${taskId}`, data);
  };

  putCommentData = async (columnId:string, taskId:string, commentId:string, data = {}) => {
    return await this._getPut(`/${columnId}/tasks/${taskId}/comments/${commentId}`, data);
  };

  putTodosTitle = async (columnId:string, taskId:string, todosId:string, data = {}) => {
    return await this._getPut(`/${columnId}/tasks/${taskId}/todos/${todosId}`, data);
  };

  putTodo = async (columnId:string, taskId:string, todosId:string, todoId:string, data = {}) => {
    return await this._getPut(`/${columnId}/tasks/${taskId}/todos/${todosId}/todo/${todoId}`, data);
  };

  // Delete

  _deleteResource = async (url: string, data = {}) => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
  };

  removeColumn = async (boardId:string, columnId:string) => {
    return await this._deleteResource(`/boards/${boardId}/columns/${columnId}`);
  };

  removeTask = async (columnId:string, taskId:string) => {
    return await this._deleteResource(`/${columnId}/tasks/${taskId}`);
  };

  removeTag = async (columnId:string, taskId:string, tagId:string) => {
    return await this._deleteResource(`/${columnId}/tasks/${taskId}/tags/${tagId}`);
  };

  removeComment = async (columnId:string, taskId:string, commentId:string) => {
    return await this._deleteResource(`/${columnId}/tasks/${taskId}/comments/${commentId}`);
  };

  removeTodo = async (columnId:string, taskId:string, todoId:string, todosId:string) => {
    return await this._deleteResource(`/${columnId}/tasks/${taskId}/todos/${todosId}/todo/${todoId}`);
  };

  removeUserFromTask = async (userId:string, data = {}) => {
    return await this._deleteResource(`/users/${userId}/addtotask`, data);
  };

  removeTodos = async (columnId:string, taskId:string, todosId:string) => {
    return await this._deleteResource(`/${columnId}/tasks/${taskId}/todos/${todosId}`);
  };
}

export default MainApiService;
