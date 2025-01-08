class API {
  static backend = 'http://localhost:5000';
  static svgParsePath = `${API.backend}/svg_parse`;

  constructor() { throw new Error("Cant create instance of API"); }

  static async svgParsePOST(svgAtStr) {
    return fetch(API.svgParsePath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ svgAtStr }),
    })
    .then(r => r.json())
    .then(d => {
      return d?.status === 200 ? d.data : [];
    });
  }
};

export default API;