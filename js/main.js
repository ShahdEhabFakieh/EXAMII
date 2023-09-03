/// <reference types="../@types/jquery" />

let mealsList = document.getElementById("mealsList")

$(document).ready(function () {
  // Toggle side bar
  animateItemsInSlideBar()
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 0)
  $('.open_Tab .btn_open').on('click', function () {
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })
});

window.onload = function () {
  let filterParam = localStorage.getItem('filterParam');
  let currentParamReserver = $('#currentParamReserver').val()
  if (filterParam) {
    localStorage.removeItem('filterParam');
    $('#currentParamReserver').val(filterParam)
    filterMeals(filterParam)
  } else if (currentParamReserver) {
    filterMeals(currentParamReserver)
  }
  else fetchAllMeals()
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

async function filterMeals(filterParam) {
  let mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filterParam}`)
  let mealsArray = await mealsResponse.json()
  mealsArray = mealsArray.meals
  hideLoading()
  if (mealsArray == null) return
  let length = Math.min(20, mealsArray.length)
  for (i = 0; i < length; i++) {
    let meal = mealsArray[i]
    addToMealsList(meal.idMeal, meal.strMeal, meal.strMealThumb)
  }
}

async function fetchAllMeals() {
  let mealsResponse = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  let mealsArray = await mealsResponse.json()
  mealsArray = mealsArray.meals
  hideLoading()
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

function hideLoading() {
  $('.loader').fadeOut(500, function () {
    $('#loading').fadeOut()
    $('container').css({ overflow: "auto" });
  })
}

