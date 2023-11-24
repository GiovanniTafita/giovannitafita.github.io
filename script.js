const helloText = document.getElementById('hello');
const greeting = document.getElementById('greeting');
const clickMe = document.getElementById('click_me');
const happyText = document.getElementById('happy');
const birthText = document.getElementById('birth');
const dayText = document.getElementById('day');
const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const heart = document.getElementById('heart');
const messageContainer = document.getElementById('message');

var duration = 60 * 1000;
var animationEnd = Date.now() + duration;
var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}



const animateCSS = (element, animation, option = '', prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);
    if (option !== '') {
      node.classList.add(`${prefix}${option}`);
    }

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });


// helloText.classList.add('animate__animated', 'animate__bounceInDown');

// helloText.addEventListener('animationend', () => {
//   clickMe.classList.add('animate__animated', 'animate__rubberBand', 'animate__repeat-2');
// });

animateCSS('#greeting', 'bounceInDown').then(() => {
  var typed = new Typed('#hello', {
    strings: ['Today is a special day'],
    typeSpeed: 100,
  });
  // clickMe.classList.remove('hide');
  animateCSS('#click_me', 'rubberBand', 'repeat-3').then(() => {
    clickMe.innerHTML = 'Click me';
    animateCSS('#click_me', 'shakeX');
  });
});

clickMe.addEventListener('click', () => {
  console.log("clicked");
  animateCSS('#greeting', 'backOutUp').then(() => {
    greeting.classList.add('hide');
    messageContainer.classList.remove('hide');
    happyText.classList.remove('hide');

    animateCSS('#happy', 'backInUp').then(() => {
      birthText.classList.remove('hide');
      animateCSS('#birth', 'backInRight').then(() => {
        dayText.classList.remove('hide');
        animateCSS('#day', 'bounceInDown').then(() => {
          name1.classList.remove('hide');
          animateCSS('#name1', 'bounceInUp').then(() => {
            name2.classList.remove('hide');
            animateCSS('#name2', 'bounceInRight').then(() => {
              heart.classList.remove('hide');
              animateCSS('#heart', 'bounceInDown').then(() => {
                animateCSS('#heart', 'heartBeat', 'infinite')
                animateCSS('#message', 'tada');
                var interval = setInterval(function () {
                  var timeLeft = animationEnd - Date.now();

                  if (timeLeft <= 0) {
                    return clearInterval(interval);
                  }

                  var particleCount = 50 * (timeLeft / duration);
                  // since particles fall down, start a bit higher than random
                  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                  confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);
              })
            })
          })
        })
      })
    })
  });
  // greeting.classList.add('hide');
})
