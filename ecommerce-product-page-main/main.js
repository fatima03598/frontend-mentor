console.log('main.js loaded');

const debounce = (func) => {
    let timer;
  
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  };

const isMobile = () => {
    return (Math.min(window.screen.width, window.screen.height) < 768 ||
    navigator.userAgent.indexOf("Mobi") > -1)
}

const handleWindowResize = () => {
    const mobile = isMobile();

    if (mobile) {
        document.body.classList.add('mobile');
        document.body.classList.remove('desktop');
        document.querySelector("nav-bar").setAttribute("mobile", true);
    } else {
        document.body.classList.add('desktop');
        document.body.classList.remove('mobile');
        document.querySelector("nav-bar").setAttribute("mobile", false);
    }
}

window.addEventListener(
    "resize",
    debounce((e) => {
      handleWindowResize();
    })
  );

handleWindowResize();