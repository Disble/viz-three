const onMount = (fn = () => { }) => {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      fn();
    }, 0);
  });
};

export {
  onMount
};