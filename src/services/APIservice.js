let apiServive = null;

class APIservice {
  constructor() {
    this.baseUrl = "https://source.unsplash.com/";
    this.urls = [];
  }

  getPicture = async (topic, sign) => {
    let data = await fetch(`${this.baseUrl}random/?${topic}?sig=${sign}`);

    // loop because API returns the equal pictures
    if (this.urls.indexOf(data.url) > -1) {
      const newSign = sign + 10;
      return this.getPicture(topic, newSign);
    }
    this.urls.push(data.url);
    ////
    return data.url;
  };

  resetUrls() {
    this.urls = [];
  }
}

export default (() => {
  if (!apiServive) apiServive = new APIservice();
  return apiServive;
})();
