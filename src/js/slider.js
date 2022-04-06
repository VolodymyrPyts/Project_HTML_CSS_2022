const slider = document.querySelector("[touch-slider]");
const slides = document.querySelectorAll("[data-slide]");
const pagination = document.querySelectorAll("[data-pagination]");
const dots = document.querySelectorAll("[data-icon-dot]");
const homes = document.querySelectorAll("[data-icon-home]");
let count = 0;


function init() {

  slides.forEach(item => {item.style.display = "none";});
  homes.forEach(item => { item.style.opacity = "0"; });
  dots.forEach(item => {item.style.opacity = "1";});

  slides[0].style.display = "block";
  homes[0].style.opacity = "1";
  dots[0].style.opacity = "0";
}

init();

for (let i = 0; i < pagination.length; i++) {
  pagination[i].addEventListener('click', function () {
    count = i;
    rollSlider(i);
  });
}

function rollSlider(item) {
    for (let i = 0; i < slides.length; i++) {
        if (i !== item) {
            slides[i].style.display = "none";
            homes[i].style.opacity = "0";
            dots[i].style.opacity = "1";
        };
    }
    slides[item].style.display = "block";
    homes[item].style.opacity = "1";
    dots[item].style.opacity = "0";
};

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);
let x = null;
let y = null;

function handleTouchStart(event) { 
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}
 
function handleTouchMove(event) {
    if (!x1 || !y1) {return false}
    let x2 =  event.touches[0].clientX;
    let y2 =  event.touches[0].clientY;
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            count++;
            if (count >= slides.length) {
                count = 0;
            }
            rollSlider(count);
        }
        else {
            count--;
            if (count < 0) {
                count = slides.length - 1;
            }
            rollSlider(count);
        }
    }
    x1 = null;
    y1 = null;
}