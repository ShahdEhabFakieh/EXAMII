/// <reference types="../@types/jquery" />

/*$('.open_Tab li').css('color' , 'white')*/


let mealsList = document.getElementById("mealsList")
let debounceTimer;

$(document).ready(function () {
  // Toggle side bar
  animateItemsInSlideBar()
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  $('.open_Tab .btn_open').on('click', function () {
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })
  // Input listeners
  $('#inputName').on('input', function () {
    var enteredValue = $(this).val();
    if(enteredValue.length > 0) $('#inputLetter').val("");
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      getCurrentSearch();
    }, 300);
  });
  $('#inputLetter').on('input', function () {
    var enteredValue = $(this).val();
    if(enteredValue.length > 0) $('#inputName').val("");
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      getCurrentSearch();
    }, 300);
  });
});

window.onload = function() {
  getCurrentSearch()
};

function animateItemsInSlideBar() {
  const listItems = $('.open_Tab .open_box ul li');

  if (listItems.hasClass('hidden')) {
    document.getElementById("icOpenClose").classList = "fa-solid fa-xmark fa-xl"
    listItems.each(function (index) {
      const listItem = $(this);
      setTimeout(function () {
        listItem.removeClass('hidden').addClass('visible');
      }, 100 * index);
    });
  } else {
    document.getElementById("icOpenClose").classList = "fas fa-bars"
    listItems.each(function (index) {
      const listItem = $(this);
      setTimeout(function () {
        listItem.removeClass('visible').addClass('hidden');
      }, 100 * index);
    });
  }
}


function getCurrentSearch() {
  let name = $('#inputName').val()
  let letter = $('#inputLetter').val()
  console.log(name + ":::" + letter)
  if (name.length > 0) fetchByName(name)
  else if (letter.length > 0) fetchByLetter(letter)
  else emptyMealsList()

}

async function fetchByName(name) {
  emptyMealsList()
  let mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let mealsArray = await mealsResponse.json()
  mealsArray = mealsArray.meals
  if (mealsArray == null) return
  let length = Math.min(20, mealsArray.length)
  for (i = 0; i < length; i++) {
    let meal = mealsArray[i]
    addToMealsList(meal.idMeal, meal.strMeal, meal.strMealThumb)
  }
}

async function fetchByLetter(letter) {
  emptyMealsList()
  let mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let mealsArray = await mealsResponse.json()
  mealsArray = mealsArray.meals
  if (mealsArray == null) return
  let length = Math.min(20, mealsArray.length)
  for (i = 0; i < length; i++) {
    let meal = mealsArray[i]
    addToMealsList(meal.idMeal, meal.strMeal, meal.strMealThumb)
  }
}

function addToMealsList(mealId, mealName, mealImgURL) {
  mealsList.innerHTML += `
    <div class="col-md-3 pt-4">
          <div class="card" onclick="onMealClicked('${mealId}')">
            <img src="${mealImgURL}" class="card-img-top rounded-2" alt="...">
            <div class="overlayer rounded-2">
              <div class="menu">
                <h6>${mealName}</h6>
              </div>
            </div>
          </div>
        </div>
    `
}

function onMealClicked(mealId) {
  localStorage.setItem('currentMealId', mealId);
  location.href = "meal.html"
}

function emptyMealsList() {
  mealsList.innerHTML = ""
}


