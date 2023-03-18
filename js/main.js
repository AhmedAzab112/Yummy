const apiUrl = "https://www.themealdb.com/api/json/v1/1";

// --------[Sections]---------
let HomeSection = document.getElementById("home");
let CategoriesSection = document.getElementById("categories");
let AreaSection = document.getElementById("area");
let IngredientsSection = document.getElementById("ingredients");
let SearchSection = document.getElementById("search");
let ContactSection = document.getElementById("contact-us");
let mealDescriptionSection = document.getElementById("meal-description");
// --------[View In Sections]---------
let HomeSectionData = document.getElementById("homeSectionData");
let categoriesSectionData = document.getElementById("categoriesSectionData");
let AreaSectionData = document.getElementById("areaSectionData");
let IngredientsSectionData = document.getElementById("ingredientsSectionData");
let mealDescriptionSectionData = document.getElementById("mealDescriptionSectionData");

const xMark = `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>`;
const toggleMark = `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>`
let navWidth = $("header").width();
let sideNavWidth = $(".side-nav").width();
let openNav = $("#openNav").html(toggleMark);
let left = true;

// -----------[OnInit]----------------
(function () {
  getRescipes();
})();

//#region ----------------------------[API CALLS]-----------------------------------------
function getRescipes(searchText = "", searchLetter = "", isSearch = 0) {
  closeNavBar();
  showLoader();
  let queryParams = { s: "" };
  if (searchText.length) {
    queryParams = {
      s: searchText,
    };
  } else if (searchLetter.length) {
    queryParams = {
      f: searchLetter,
    };
  }
  fetch(`${apiUrl + "/search.php?"}` + new URLSearchParams(queryParams))
    .then((response) => response.json())
    .then((json) => {
      if (json.meals === null) {
        HomeSectionData.innerHTML = "";
      } else {
        showRecipes(json.meals, isSearch);
      }
      hideLoader();
    });
}

function getGategories() {
  closeNavBar();
  showLoader();
  fetch(`${apiUrl + "/categories.php"}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.categories === null) {
        categoriesSectionData.innerHTML = "";
      } else {
        showCategories(json.categories);
      }
      hideLoader();
    });
}

function getAreas() {
  closeNavBar();
  showLoader();
  let queryParams = { a: "list" };
  fetch(`${apiUrl + "/list.php?"}` + new URLSearchParams(queryParams))
    .then((response) => response.json())
    .then((json) => {
      if (json.meals === null) {
        AreaSectionData.innerHTML = "";
      } else {
        showAreas(json.meals);
      }
      hideLoader();
    });
}

function getIngredients() {
  closeNavBar();
  showLoader();
  let queryParams = { i: "list" };
  fetch(`${apiUrl + "/list.php?"}` + new URLSearchParams(queryParams))
    .then((response) => response.json())
    .then((json) => {
      if (json.meals === null) {
        IngredientsSectionData.innerHTML = "";
      } else {
        showIngredients(json.meals);
      }
      hideLoader();
    });
}

function getMealDescription(mealId) {
  closeNavBar();
  showLoader();
  let queryParams = { i: mealId };
  fetch(`${apiUrl + "/lookup.php?"}` + new URLSearchParams(queryParams))
    .then((response) => response.json())
    .then((json) => {
      if (json.meals === null) {
        mealDescriptionSectionData.innerHTML = "";
      } else {
        showMealDescription(json.meals);
      }
      hideLoader();
    });
}

function getRecipesByCategory(Category){
    closeNavBar();
    showLoader();
    let queryParams = { c: Category };
    fetch(`${apiUrl + "/filter.php?"}` + new URLSearchParams(queryParams))
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.meals === null) {
          HomeSectionData.innerHTML = "";
        } else {
          showRecipes(json.meals, 0);
        }
        hideLoader();
      });
}

function getRecipesByArea(area){
    closeNavBar();
    showLoader();
    let queryParams = { a: area };
    fetch(`${apiUrl + "/filter.php?"}` + new URLSearchParams(queryParams))
      .then((response) => response.json())
      .then((json) => {
        if (json.meals === null) {
          HomeSectionData.innerHTML = "";
        } else {
          showRecipes(json.meals, 0);
        }
        hideLoader();
      });
}

function getRecipesByIngredients(ingredient){
    closeNavBar();
    showLoader();
    let queryParams = { i: ingredient };
    fetch(`${apiUrl + "/filter.php?"}` + new URLSearchParams(queryParams))
      .then((response) => response.json())
      .then((json) => {
        if (json.meals === null) {
          HomeSectionData.innerHTML = "";
        } else {
          showRecipes(json.meals, 0);
        }
        hideLoader();
      });
}
//#endregion

//#region ----------------------------[View Data]------------------------------------------
function showRecipes(data, isSearch) {
  isSearch
    ? controlSections(1, 1, 0, 0, 0, 0, 0)
    : controlSections(1, 0, 0, 0, 0, 0, 0); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
  let dataView = ``;
  for (let i = 0; i < data.length; i++) {
    dataView += `
          <div class="col-md-3 col-xl-3 item" onclick="getMealDescription(${data[i].idMeal})">
              <div class="img">
              <img class="rounded" src="${data[i].strMealThumb}" alt="">
              </div>
              <div class="outline d-flex flex-column justify-content-center">
              <span class="p-5">${data[i].strMeal}</span>
              </div>
          </div>
      `;
    HomeSectionData.innerHTML = dataView;
  }
}

function showCategories(data) {
  controlSections(0, 0, 1, 0, 0, 0, 0); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
  let dataView = ``;
  for (let i = 0; i < data.length; i++) {
    dataView += `
          <div class="col-md-3 col-xl-3 item" onclick="getRecipesByCategory('${data[i].strCategory}')">
              <div class="img">
              <img class="rounded" src="${data[i].strCategoryThumb}" alt="">
              </div>
              <div class="outline rounded text-center">
              <span>${data[i].strCategory}</span>
              <p class="px-4">${data[i].strCategoryDescription}</p>
              </div>
          </div>
      `;
    categoriesSectionData.innerHTML = dataView;
  }
}


function showAreas(data) {
  controlSections(0, 0, 0, 1, 0, 0, 0); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
  let dataView = ``;
  for (let i = 0; i < data.length; i++) {
    dataView += `
        <div class="col-md-3 col-xl-3 d-flex flex-column py-3" onclick="getRecipesByArea('${data[i].strArea}')">
            <svg width="90" height="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="white" d="M218.3 8.5c12.3-11.3 31.2-11.3 43.4 0l208 192c6.7 6.2 10.3 14.8 10.3 23.5H336c-19.1 0-36.3 8.4-48 21.7V208c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h64V416H112c-26.5 0-48-21.5-48-48V256H32c-13.2 0-25-8.1-29.8-20.3s-1.6-26.2 8.1-35.2l208-192zM352 304V448H544V304H352zm-48-16c0-17.7 14.3-32 32-32H560c17.7 0 32 14.3 32 32V448h32c8.8 0 16 7.2 16 16c0 26.5-21.5 48-48 48H544 352 304c-26.5 0-48-21.5-48-48c0-8.8 7.2-16 16-16h32V288z"/></svg>
            <h3 class="text-white">${data[i].strArea}</h3>
        </div>
    `;
    AreaSectionData.innerHTML = dataView;
  }
}

function showIngredients(data) {
  controlSections(0, 0, 0, 0, 1, 0, 0); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
  let dataView = ``;
  for (let i = 0; i < 20; i++) {
    dataView += `
        <div class="col-md-3 col-xl-3 d-flex flex-column align-items-center text-center description py-4" onclick="getRecipesByIngredients('${data[i].strIngredient}')">
            <svg width="100" height="90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M160 265.2c0 8.5-3.4 16.6-9.4 22.6l-26.8 26.8c-12.3 12.3-32.5 11.4-49.4 7.2C69.8 320.6 65 320 60 320c-33.1 0-60 26.9-60 60s26.9 60 60 60c6.3 0 12 5.7 12 12c0 33.1 26.9 60 60 60s60-26.9 60-60c0-5-.6-9.8-1.8-14.5c-4.2-16.9-5.2-37.1 7.2-49.4l26.8-26.8c6-6 14.1-9.4 22.6-9.4H336c6.3 0 12.4-.3 18.5-1c11.9-1.2 16.4-15.5 10.8-26c-8.5-15.8-13.3-33.8-13.3-53c0-61.9 50.1-112 112-112c8 0 15.7 .8 23.2 2.4c11.7 2.5 24.1-5.9 22-17.6C494.5 62.5 422.5 0 336 0C238.8 0 160 78.8 160 176v89.2z"/></svg>
            <h3 class="text-white">${data[i].strIngredient}</h3>
            <p class="text-white">${data[i].strDescription.substring(
              0,
              100
            )}</p>
        </div>
    `;
    IngredientsSectionData.innerHTML = dataView;
  }
}

function showMealDescription(description) {
  controlSections(0, 0, 0, 0, 0, 0, 1); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
  let dataView = `
        <div class="left-desc">
            <img class="rounded" src="${description[0].strMealThumb}" alt="">
            <h3 class="text-white">${description[0].strMeal}</h3>
        </div>
        <div class="right-desc">
            <h3>Instructions</h3>
            <p>${description[0].strInstructions}</p>
            <div class="details d-flex flex-column">
            <span>Area : ${description[0].strArea}</span>
            <span>Category : ${description[0].strCategory}</span>
            <span>Recipes :</span>
            </div>
            <div class="d-flex flex-wrap">
                ${getMealDescStrIngredient(description)}
            </div>
            <div class="py-3">
            <h3 class="text-white">Tags :</h3>
            <div class="d-flex flex-wrap">
                ${getMealDescStrMeasure(description)}
            </div>
            </div>
            <div class="btn">
            <button type="button" class="btn btn-success">
              <a href="${description[0].strSource}" target="_blank">Sourse</a>
            </button>
            <button type="button" class="btn btn-danger">
                <a href="${description[0].strYoutube}" target="_blank">Youtube</a>
            </button>
            </div>
        </div>
    `;
  mealDescriptionSectionData.innerHTML = dataView;

  function getMealDescStrIngredient(description) {
    let dataView = ``;
    for (let i = 1; i <= 20; i++) {
      if (description[0]["strIngredient" + i] && description[0]["strIngredient" + i].trim().length > 0) {
        dataView += `<div class="rescipe rounded py-1 px-2 mx-1 my-2">${description[0]["strIngredient" + i]}</div>`;
      }
    }
    return dataView;
  }
  
  function getMealDescStrMeasure(description) {
    let dataView = ``;
    for (let i = 1; i <= 20; i++) {
      if (description[0]["strMeasure" + i] && description[0]["strMeasure" + i].trim().length > 0) {
        dataView += `<div class="tag rounded py-1 px-2 mx-1 my-2">${description[0]["strMeasure" + i]}</div>`;
      }
    }
    return dataView;
  }
}
//#endregion

//#region ------------------------------[Events & Helper]------------------------------------------
function enableSearch() {
  closeNavBar()
  controlSections(1, 1, 0, 0, 0, 0, 0); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
  HomeSectionData.innerHTML = "";
}

function searchByName(searchText) {
  getRescipes(searchText, "", 1); //searchText - searchLetter - isSearch
}

function searchByLetter(searchLetter) {
  getRescipes("", searchLetter, 1); //searchText - searchLetter - isSearch
}

function enablecontactUs() {
  closeNavBar()
  controlSections(0, 0, 0, 0, 0, 1, 0); // isHome, isSearch, isCategories, isArea, isIngredients, isContact
}

function controlSections(
  isHome,
  isSearch,
  isCategories,
  isArea,
  isIngredients,
  isContact,
  isMealDesc
) {
  isHome
    ? (HomeSection.style = "display: block")
    : (HomeSection.style = "display: none");
  isSearch
    ? (SearchSection.style = "display: block")
    : (SearchSection.style = "display: none");
  isCategories
    ? (CategoriesSection.style = "display: block")
    : (CategoriesSection.style = "display: none");
  isArea
    ? (AreaSection.style = "display: block")
    : (AreaSection.style = "display: none");
  isIngredients
    ? (IngredientsSection.style = "display: block")
    : (IngredientsSection.style = "display: none");
  isContact
    ? (ContactSection.style = "display: block")
    : (ContactSection.style = "display: none");
  isMealDesc
    ? (mealDescriptionSection.style = "display: block")
    : (mealDescriptionSection.style = "display: none");
}
//#endregion

//#region ------------------------------[Valdation]--------------------------
function checkFormValdation() {
  const submitButton = document.getElementById("submitButton");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const age = document.getElementById("age");
  const password = document.getElementById("password");
  const repassword = document.getElementById("re-password");
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  const regPhone = "[0-9]{10}$";
  const regName = `[a-zA-Z]`;
  if (
    name.value &&
    email.value &&
    phone.value &&
    age.value &&
    password.value &&
    repassword.value
  ) {
    if (
      name.value.match(regName) != null &&
      email.value.match(regEmail) != null &&
      phone.value.match(regPhone) != null &&
      age.value > 0 &&
      password.value === repassword.value
    ) {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled", "true");
    }
  } else {
    submitButton.setAttribute("disabled", "true");
  }
}
//#endregion

//#region ------------------------------[Loader]---------------------------------
function showLoader() {
  document.getElementById("loader").style = "display: flex";
}
function hideLoader() {
  document.getElementById("loader").style = "display: none";
}
//#endregion

//#region ------------------------------[nav-bar]------------------------------
$("#openNav").click(() => {
  if (left) {
    $("header").animate({ left: 0 }, 500);
    openNav = $("#openNav").html(xMark);
    left = false;
  } else {
    closeNavBar()
  }
});

function closeNavBar(){
    $("header").animate({ left: `-${navWidth - sideNavWidth}` }, 500);
    openNav = $("#openNav").html(toggleMark);
    left = true;
}

//#endregion
