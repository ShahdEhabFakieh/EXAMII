/// <reference types="../@types/jquery" />


let mealName = document.getElementById("meal-name")
let mealImage = document.getElementById("meal-img")
let mealInstructions = document.getElementById("meal-instructions")
let mealArea = document.getElementById("meal-area")
let mealCategory = document.getElementById("meal-category")
let ingredientsList = document.getElementById("ingredientsList")
let tagsList = document.getElementById("tagsList")
let btnSource = document.getElementById("btnSource")
let btnYoutube = document.getElementById("btnYoutube")


$(document).ready(function () {
  // Toggle side bar
  animateItemsInSlideBar()
  $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  $('.open_Tab .btn_open').on('click', function () {
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
  })
  let currentMealId = localStorage.getItem('currentMealId');
  fetchMealData(currentMealId)
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

async function fetchMealData(mealId) {
  let mealResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  let mealData = await mealResponse.json()
  mealData = mealData.meals[0]
  hideLoading()
  bindMainDataToViews(
    mealData.strMeal,
    mealData.strMealThumb,
    mealData.strInstructions,
    mealData.strArea,
    mealData.strCategory,
    mealData.strSource,
    mealData.strYoutube
  )
  for (i = 1; i <= 20; i++) {
    let ingredientI = mealData[`strIngredient${i}`];
    let measureI = mealData[`strMeasure${i}`]
    if (ingredientI == null || ingredientI == "" || measureI == null || measureI == "")
      continue
    addToIngredientsList(ingredientI, measureI)
  }
  let tags = mealData.strTags
  if (tags != null && tags != "") {
    tags = tags.split(",")
    for (i = 0; i < tags.length; i++) {
      addToTagsList(tags[i])
    }
  }
}

function bindMainDataToViews(name, image, instructions, area, category, srcLink, youtubeLink) {
  mealName.innerHTML = name
  mealImage.src = image
  mealInstructions.innerHTML = instructions
  mealArea.innerHTML = "Area : " + area
  mealCategory.innerHTML = "Category : " + category
  btnSource.href = srcLink
  btnYoutube.href = youtubeLink
}

function addToIngredientsList(ingredientName, ingredientMeasure) {
  ingredientsList.innerHTML += `
    <span class="rounded-2 bg-info p-2 mt-3 me-3">${ingredientMeasure} ${ingredientName}</span>
    `
}

function addToTagsList(tagName) {
  tagsList.innerHTML += `
    <span class="rounded-2 bg-secondary p-2 mt-3 me-3">${tagName}</span>
    `
}

function hideLoading() {
  $('.loader').fadeOut(500, function () {
    $('#loading').fadeOut()
    $('container').css({ overflow: "auto" });
  })
}

