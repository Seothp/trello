export default function debounce(func, ms) {
  let isCooldown = false;

  return function () {
    if (isCooldown) return;

    func();

    isCooldown = true;

    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
}
