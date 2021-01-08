class MainApiService {
  _API_URL = 'url_our_api';

  async getResource(url: string) {
    const res = await fetch(url);

    return await res.json();
  }
}

export default MainApiService;
