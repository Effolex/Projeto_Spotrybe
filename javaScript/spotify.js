export default class spotify {
  token = ''

  constructor() {
    this.token = this.getToken();
  }
  async getToken() {
    const CLIENT_ID = '062ce822e4104fa4827a8db0ee93263d';
    const CLIENT_SECRET = 'e2e8aa8221984bb9959a7e2ef62de1e1';
    const API_TOKEN = 'https://accounts.spotify.com/api/token';
    const response = await fetch(API_TOKEN, {
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: 'Basic '+ btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method : 'POST',
    })
    if (response.status == 200) {
      let data = await response.json();
      return data.access_token;
    }
  }

  async getTrack(id) {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}?market=BR`, {
      headers: {
      Accept: "application/json",
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);
    return data;
  }

  async getNPossibleTracks(name = '', possibleTracks) {
    const formatedName = name.replaceAll(' ', '%20');
    const response = await fetch(`https://api.spotify.com/v1/search?q=${formatedName}&type=track&market=BR&market=US&limit=${possibleTracks}`, 
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(response);
    const data = await response.json();
    return data;
  }

}