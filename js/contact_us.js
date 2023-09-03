/// <reference types="../@types/jquery" />



// Get references to the form inputs and alert elements
const nameInput = document.getElementById('Name');
const emailInput = document.getElementById('Email');
const phoneInput = document.getElementById('Phone');
const ageInput = document.getElementById('Age');
const passwordInput = document.getElementById('Password');
const repasswordInput = document.getElementById('Re-password');

const nameAlert = document.getElementById('Name_Alert');
const emailAlert = document.getElementById('Email_Alert');
const phoneAlert = document.getElementById('phoneAlert');
const ageAlert = document.getElementById('Age_Alert');
const passwordAlert = document.getElementById('passwordAlert');
const repasswordAlert = document.getElementById('Repassword_Alert');
const submitButton = document.querySelector('#contactbtn[type="submit"]');

$(document).ready(function () {
  // Toggle side bar
  animateItemsInSlideBar()
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  $('.open_Tab .btn_open').on('click', function () {
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })

    // Input Check
    $('#Name').on('input', function () {
      showHideAlert(nameAlert, nameInput.value.trim() === '')
    });
    $('#Email').on('input', function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      showHideAlert(emailAlert, !emailRegex.test(emailInput.value))
    });
    $('#Phone').on('input', function () {
      const phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      showHideAlert(phoneAlert, !phoneNumberRegex.test(phoneInput.value))
    });
    $('#Age').on('input', function () {
      showHideAlert(ageAlert, ageInput.value.trim() === '')
    });
    $('#Password').on('input', function () {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      showHideAlert(passwordAlert, !passwordRegex.test(passwordInput.value))
    });
    $('#Re-password').on('input', function () {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
      showHideAlert(
        repasswordAlert,
        !passwordRegex.test(repasswordInput.value) || passwordInput.value != repasswordInput.value
      )
    });
});

function showHideAlert(alert, show) {
  if (show) {
    alert.classList.remove('d-none');
  } else {
    alert.classList.add('d-none');
  }
}

function animateItemsInSlideBar() {
  const listItems = $('.open_Tab .open_box ul li');

  if (listItems.hasClass('hidden')) {
    listItems.each(function (index) {
      const listItem = $(this);
      setTimeout(function () {
        listItem.removeClass('hidden').addClass('visible');
      }, 100 * index);
    });
  } else {
    listItems.each(function (index) {
      const listItem = $(this);
      setTimeout(function () {
        listItem.removeClass('visible').addClass('hidden');
      }, 100 * index);
    });
  }
}