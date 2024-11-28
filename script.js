///////////letras dinâmicas/////////

let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    })
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = 1;

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = words[currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=> {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

////////////////////área de habilidades/////////////////////

const circles = document.querySelectorAll(".circle");

circles.forEach(elem => {
    const dots = parseInt(elem.getAttribute("data-dots"));
    const marked = parseInt(elem.getAttribute("data-percent")); 
    const percent = Math.floor((dots * marked) / 100);
    let points = "";
    const rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll(".points");

    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }
});

// filtro do portfolio//

const filterButtons = document.querySelectorAll('.fillter-buttons .btn');
const portfolioItems = document.querySelectorAll('.port-box');
const activeBar = document.querySelector('.active-bar');

activeBar.style.width = filterButtons[0].offsetWidth + 'px';
activeBar.style.left = filterButtons[0].offsetLeft + 'px';

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');

        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        activeBar.style.width = button.offsetWidth + 'px';
        activeBar.style.left = button.offsetLeft + 'px';

        portfolioItems.forEach(item => {
            
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

///////menu//////////

let menuLi = document.querySelectorAll('header ul li a');
let sections = document.querySelectorAll('section');

function activeMenu() {
    let len = sections.length;
    let scrollPosition = window.scrollY + window.innerHeight / 2;
    menuLi.forEach(link => link.classList.remove("active"));

    while (--len >= 0) {
        if (scrollPosition >= sections[len].offsetTop && scrollPosition < sections[len].offsetTop + sections[len].offsetHeight) {
            menuLi[len].classList.add("active");
            break;
        }
    }
}

activeMenu();
window.addEventListener('scroll', activeMenu);

////////////header//////////

const navLinks = document.querySelectorAll('.navlist a');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = targetSection.getBoundingClientRect().top; 
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

////////////////////menu toggle/////////////

let menuIcon = document.querySelector('#menu-icon');
let navList = document.querySelector('.navlist');

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
}

window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    navList.classList.remove("open");
}