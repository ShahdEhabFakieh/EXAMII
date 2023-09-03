/// <reference types="../@types/jquery" />

/*$('.open_Tab li').css('color' , 'white')*/

let categoriesList = document.getElementById("categoriesList")

$(document).ready(function () {
  // Toggle side bar
  animateItemsInSlideBar()
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  $('.open_Tab .btn_open').on('click', function () {
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })
  fetchAllCategories()
});

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

async function fetchAllCategories() {
  let categoriesResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  let categoriesArray = await categoriesResponse.json()
  categoriesArray = categoriesArray.categories
  for (i = 0; i < categoriesArray.length; i++) {
    let category = categoriesArray[i]
    addToCategoriesList(category.strCategory, category.strCategoryDescription, category.strCategoryThumb)
  }
}

function addToCategoriesList(categoryName, categoryDescription, categoryImgURL) {
  categoriesList.innerHTML += `
    <div class="col-md-3 pt-4">
          <div class="card" onclick="onCategoryClicked('${categoryName}')">
            <img src="${categoryImgURL}" class="card-img-top rounded-2 bg-transparent" alt="...">
            <div class="overlayer rounded-2">
              <h6>${categoryName}</h6>
              <p>${categoryDescription}</p>
            </div>
          </div>
        </div>
    `
}

function onCategoryClicked(category) {
  localStorage.setItem('isFilter', "1");
  localStorage.setItem('filterParam', `c=${category}`);
  location.href = "index.html"
}

