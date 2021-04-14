const setStats = ({ red = 33, yellow = 0, green = 33, blue = 33 }) => {
  document.getElementById('index-red').innerText = `${red}%`;
  document.getElementById('index-yellow').innerText = `${yellow}%`;
  document.getElementById('index-green').innerText = `${green}%`;
  document.getElementById('index-blue').innerText = `${blue}%`;
}

const frontEndController = {
  updateStats: ({ red, yellow, green, blue, callback }) => {
    console.log('updateStats', red, yellow, green, blue);
    if (callback) callback();
    // if (red && yellow && green && blue) {
    setStats({ red, yellow, green, blue });
    // }
  }
}

export default frontEndController;