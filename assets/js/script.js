'use strict';

/**
 * Add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * Active header & back top btn when window scroll down to 100px
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", activeElemOnScroll);

/**
 * Contribution button functionality
 */
document.getElementById("contribute-btn").addEventListener("click", function () {
  const email = document.getElementById("contribution-email").value.trim();
  const phone = document.getElementById("contribution-phone").value.trim();
  const formLink = "https://docs.google.com/forms/d/e/1FAIpQLSdreZO-QT2sZXPkrRK1fDUMrCbDX9Zj-FqRzHwOBRt9399V7w/viewform?usp=sf_link"; // Google Form link

  if (phone) {
    sendSMS(phone, formLink); // Call SMS function
    document.getElementById("popup-sms").style.display = "block"; // Show SMS popup
  } else if (email) {
    sendEmail(email, formLink); // Call Email function
    document.getElementById("popup-email").style.display = "block"; // Show email popup
  } else {
    alert("Please enter a valid email or phone number.");
  }
});

/**
 * Function to send an email programmatically
 */
function sendEmail(email, formLink) {
  fetch('http://localhost:3000/send-email', {  // Use the actual backend URL in production
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      formLink: formLink,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log('Email sent successfully.');
      } else {
        alert('Failed to send email: ' + data.message);
      }
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
}

/**
 * Function to send an SMS programmatically
 */
function sendSMS(phone, formLink) {
  alert(
    `SMS functionality requires an external service like Twilio. Please visit: ${formLink}`
  );
  // Replace this with actual SMS API integration if required.
}

/**
 * Close popup message
 */
function closePopupMessage(popupId) {
  document.getElementById(popupId).style.display = "none";
}
