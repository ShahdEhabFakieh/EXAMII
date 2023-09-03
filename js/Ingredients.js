/// <reference types="../@types/jquery" />

/*$('.open_Tab li').css('color' , 'white')*/


let ingredientsList = document.getElementById("ingredientsList")


$(document).ready(function () {
    // Toggle side bar
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    $('.open_Tab .btn_open').on('click', function () {
      animateItemsInSlideBar()
      $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    })
    fetchAllIngredients()
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

async function fetchAllIngredients() {
    let ingredientsResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let ingredientsArray = await ingredientsResponse.json()
    ingredientsArray = ingredientsArray.meals
    let length = Math.min(20, ingredientsArray.length)
    for (i = 0; i < length; i++) {
        let ingredient = ingredientsArray[i]
        addToIngredientsList(ingredient.strIngredient, ingredient.strDescription)
    }
}

function addToIngredientsList(ingredientName, ingredientDescription) {
    ingredientsList.innerHTML += `
    <div class="col-md-3 pt-4">
                    <div class="card text-center text-white" onclick="onIngredientClicked('${ingredientName}')">
                        <span class="Ing_icon"><i class="fa-solid fa-drumstick-bite fa-2xl"
                                style="color: #ffffff;"></i></span>
                        <h2 class="text-white">${ingredientName}</h2>
                        <p class="line-clamp">${ingredientDescription}</p>
                    </div>
                </div>
    `
}

function onIngredientClicked(ingredient) {
  localStorage.setItem('isFilter', "1");
  localStorage.setItem('filterParam', `i=${ingredient}`);
  location.href = "index.html"
}

