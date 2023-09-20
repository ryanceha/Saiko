import AOS from "aos";
import "aos/dist/aos.css";
import "boxicons";

// init AOS animation
AOS.init({
  duration: 1000,
  offset: 100,
});

// selectors
const searchIcon = document.querySelector(".search-icon");
const searchToggle = document.querySelector(".search");
const headerMenuToggle = document.querySelector(".header__menu");
const emailToggle = document.querySelector(".email");
const track = document.querySelector(".popular-foods__catalogue");

var CardContainer = document.getElementById("card-container");
var cards = CardContainer.getElementsByClassName("popular-foods__card");

const catalogue = document.querySelector(".popular-foods__catalogue");

// state
const search__bar = localStorage.getItem("search__bar");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained =
    parseFloat(track.dataset.prevPercentage) + percentage;
  var balancer = (1152 / catalogue.clientWidth) * 100;
  if(balancer > 100){
    balancer = 100;
  }
  const nextPercentage = Math.max(
    Math.min(nextPercentageUnconstrained, 0),
    -100 + balancer
  );

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, 0%)`,
    },
    { duration: 1200, fill: "forwards" }
  );
};




// on mount
if (search__bar) {
  emailToggle.classList.toggle("active");
  headerMenuToggle.classList.toggle("active");
  searchToggle.classList.toggle("active");
}

// handlers
function validateEmail(email) {
  var re =
    /^(([a-zA-Z0-9]+)|([a-zA-Z0-9]+((?:\_[a-zA-Z0-9]+)|(?:\.[a-zA-Z0-9]+))*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$)/;
  return re.test(email);
}

function toggleSearchBar() {
  emailToggle.classList.toggle("active");
  headerMenuToggle.classList.toggle("active");
  searchToggle.classList.toggle("active");
  if (searchToggle.classList.contains("active")) {
    localStorage.setItem("search__bar", "active");
  } else {
    localStorage.removeItem("search__bar");
  }
}

//events

searchIcon.addEventListener("click", toggleSearchBar);

window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = (e) => handleOnUp(e);
window.ontouchend = (e) => handleOnUp(e.touches[0]);
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);

for (var i = 0 ; i < cards.length ; i++){
  cards[i].addEventListener('click', function(){
      var current = document.getElementsByClassName("active-card");
      current[0].className = current[0].className.replace(" active-card", "");
      this.className += " active-card";
  });
}

const categoryButton = document.querySelectorAll(".popular-foods__filters"); 

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.popular-foods__filter-btn');
  const contentItems = document.querySelectorAll('.popular-foods__card');

  // Function to filter and display content based on the selected category
  function filterContent(category) {
      contentItems.forEach(item => {
          if (category === 'all' || item.classList.contains(category)) {
              item.style.display = 'flex';
          } else {
              item.style.display = 'none';
          }
      });
  }

  // Event listener for filter button clicks
  filterButtons.forEach(button => {
      button.addEventListener('click', function () {
          const selectedCategory = button.id.replace('-filter', ''); // Extract category from button id
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          filterContent(selectedCategory);
      });
  });

  // Initial display of all content
  filterContent('all');
});













// submitBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     var errorText = "";
//     const text = document.getElementById("nameText").value;
//     console.log(text.length);
//     if (text != "") {
//         console.log("test");
//         document.getElementById("logoUser").style.color = "red"
//         nameText.style.color = "red";
//     } else {
//         document.getElementById("logoUser").style.color = "#999"
//         nameText.style.color = "#777575";
//     }

//     const password = document.getElementById("passText").value;

//     if (password.length < 5) {
//         document.getElementById("logoPass").style.color = "red"
//         passText.style.color = "red";
//     } else {
//         document.getElementById("logoPass").style.color = "#999"
//         passText.style.color = "#777575";
//     }

//     const age = document.getElementById("ageText").value;

//     if (age < 13) {
//         document.getElementById("logoAge").style.color = "red"
//         ageText.style.color = "red";
//     } else {
//         document.getElementById("logoAge").style.color = "#999"
//         ageText.style.color = "#777575";
//     }

//     const email = document.getElementById("emailText").value;

//     if (!(email.includes("@gmail.com"))) {
//         document.getElementById("logoEmail").style.color = "red"
//         emailText.style.color = "red";
//     } else {
//         document.getElementById("logoEmail").style.color = "#999"
//         emailText.style.color = "#777575";
//     }

//     errorText = "";
//     const checkBoxx = checkBoxId.checked;

//     if (!checkBoxx) {
//         cekboks.style.color = "red";
//     } else {
//         cekboks.style.color = "#000";
//     }
// })
