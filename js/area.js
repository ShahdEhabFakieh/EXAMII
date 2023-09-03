/// <reference types="../@types/jquery" />

/*$('.open_Tab li').css('color' , 'white')*/

let areasList = document.getElementById("areasList")

$(document).ready(function () {
    // Toggle side bar
    animateItemsInSlideBar()
    $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    $('.open_Tab .btn_open').on('click', function () {
      animateItemsInSlideBar()
      $('.open_Tab .open_box').animate({ width: 'toggle' }, 1000)
    })
    fetchAllAreas()
  });
  
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

async function fetchAllAreas() {
    let areasResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    let areasArray = await areasResponse.json()
    areasArray = areasArray.meals
    hideLoading()
    for (i = 0; i < areasArray.length; i++) {
        let area = areasArray[i]
        addToAreasList(area.strArea)
    }
}

function addToAreasList(areaName) {
    areasList.innerHTML += `
    <div class="col-md-3 pt-4">
          <div class="card text-center" onclick="onAreaClicked('${areaName}')">
            <span class="City_icon"><i class="fa-solid fa-house-laptop fa-2xl" style="color: #ffffff;"></i></span>
            <h2 class="text-white">${areaName}</h2>
          </div>
        </div>
    `
}

function onAreaClicked(areaId) {
    localStorage.setItem('isFilter', "1");
    localStorage.setItem('filterParam', `a=${areaId}`);
    location.href = "index.html"
}

function hideLoading() {
  $('.loader').fadeOut(500, function () {
    $('#loading').fadeOut()
    $('container').css({ overflow: "auto" });
  })
}

