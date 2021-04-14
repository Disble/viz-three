const onMount = (fn = () => { }) => {
  window.addEventListener('DOMContentLoaded', () => {
    fn();
  });
};

export {
  onMount
};