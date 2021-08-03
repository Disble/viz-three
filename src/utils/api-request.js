import Plotly from 'plotly.js-dist';

export default {
  csvRequest: (path) => {
    return new Promise((resolve, reject) => {
      Plotly.d3.csv(path, function (err, rows) {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  jsonRequest: async (path) => {
    console.log('💔', path);
    const res = await fetch(path)
    const json = res.json();
    return json;
  }
};