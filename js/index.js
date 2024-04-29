"use strict"
let allget = [];
let dateROW = document.getElementById("dateROW");
let categories = document.getElementById("categories");
let search = document.getElementById("search");
let area = document.getElementById("area");
let ingredients = document.getElementById("ingredients");
let contact = document.getElementById("contact");
let sideWidth = $(".link").innerWidth();
let submitBtn;
let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repasswordTouched = false;
$( ()=> {

  $("#loading").slideUp(500, function () {
    $("#loading").remove();
  });

});
$("aside").css("left", -sideWidth);
$(".openclick").click( ()=> {
  sideWidth = $(".link").innerWidth();

  if ($("aside").css("left") == "0px") {
    $("aside").animate({ left: -sideWidth }, 500);
    $(".links li").animate({ top: 300 }, 200);
    for (let i = 0; i < 5; i++) {
      $(".link div ul li").eq(i).animate({
        top: 300,
      }, (i + 5) * 100);
    };
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
  }
  else {
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $("aside").animate({ left: "0px" }, 500);
    for (let i = 0; i < 5; i++) {
      $(".link div ul li").eq(i).animate({
        top: 0,
      }, (i + 5) * 50);
    };
  };
});
$(() => {
  searchName("").then(() => {
    $("#loeding").fadeOut(300, () => {
      $("body").css("overflow", "auto");
      $("#loeding").remove();
    });
  });
});
async function mailgetApi() {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  allget = await date.json();
  displayapi(allget.meals.slice(0, 20));
  $("#loeding").fadeOut(300);

};
function displayapi(dxer) {
  let cartoona = ``;
  for (let i = 0; i < dxer.length; i++) {
    cartoona += `
        <div onclick="getMealDetails(${dxer[i].idMeal})" class="   p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
                <div class="parent group mt-4 relative overflow-hidden">
                    <img class="rounded-xl" src="${dxer[i].strMealThumb}" alt="zxczxczx">
                    <div
                        class="child flex rounded-xl items-center opacity-0 bg-slate-50 absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                        <p class="text-2xl font-bold">${dxer[i].strMeal}</p>
                    </div>
                </div>
            </div>
        `
  };
  dateROW.innerHTML = cartoona;
};
async function getMealDetails(mealID) {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID} `);
  let allget = await date.json();
  displayMealDetails(allget.meals[0]);
  $("#loeding").fadeOut(300);
};
function displayMealDetails(meal) {
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = '';
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class=" text-black  bg-[#f5c2c7] rounded-sm py-2 px-3 m-2">${tags[i]}</li>`
  };
  let tablespoons = ``;
  for (let i = 1; i <= 30; i++) {
    if (meal[`strIngredient${i}`]) {
      tablespoons +=
        `<li class="bg-[#cff4fc] rounded-sm py-1 text-black m-2 p-1">
             ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
            </li>
            `
    };
  };
  let cartoona = `
                    <div class=" flex flex-wrap ">
                             <div class="p-5 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full  mt-24  flex flex-col flex-wrap items-start justify-start ">
                                 <img class="w-full mx-auto flex flex-col flex-wrap items-start justify-start rounded-3" src="${meal.strMealThumb}" alt="strMealThumb">
                                 <h2 class="mx-auto text-slate-50 font-bold text-xl text-center py-4">${meal.strMeal}</h2>
                             </div>

                           <div class="w-1/2  lg:w-1/2 md:w-1/2  sm:w-1/2 w-full">
                               <h2 class="text-slate-50 text-2xl py-11 me-auto font-bold">Instructions</h2>
                               <p class="text-slate-50 leading-9 text-xl text-wrap">${meal.strInstructions}</p>
                               <h3 class="me-auto text-slate-50"><span class=" text-slate-50 font-bold text-xl">Area : </span
                                       class="text-slate-50 font-bold text-2xl">${meal.strArea}</h3>
                               <h3 class="me-auto text-slate-50"><span class="text-slate-50 font-bold text-xl">Category : </span
                                       class="text-slate-50 font-bold text-xl">${meal.strCategory}</h3>
                               <h3 class="me-auto text-slate-50 my-4 font-bold text-xl">Recipes :</h3>
                                     <ul class="list-unstyled flex  text-slate-50 flex-wrap">
                                       ${tablespoons}
                                    </ul>
                                 
                                        <h3 class="me-auto text-slate-50 font-bold text-xl">Tags :</h3>
                                              <ul class="me-auto text-slate-50 flex rounded-sm py-3 px-6 ">
                                            ${tagsStr}
                                            </ul>
                                 <div class="flex  mt-7"> 
                                     <a target="_blank" href="${meal.strSource}"
                                         class=" text-slate-50 py-3 px-6 flex rounded-sm bg-green-600 mx-3">Source</a>
                                     <a target="_blank" href="${meal.strYoutube}"
                                         class="text-slate-50 py-3 px-6 flex rounded-sm bg-red-700 mx-3">Youtube</a>
                                 </div>

                           </div>
                    </div>
            `
  dateROW.innerHTML = cartoona;
  dateinput.innerHTML = ``;
};
///////////////////////////////////////////
async function getApi() {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  allget = await date.json();
  displaycategories(allget.categories);
  $("#loeding").fadeOut(300);
};
function displaycategories(der) {
  let cartoona = ``;
  for (let i = 0; i < der.length; i++) {
    cartoona += `
        <div  class="allmain  p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
        <div onclick="getCategoryMeals('${der[i].strCategory}')" class="parent group mt-4 relative overflow-hidden">
            <img class="rounded-xl" src="${der[i].strCategoryThumb}" alt="images">
            <div
                class="child flex flex-col  text-center mx-auto rounded-xl items-center opacity-0 bg-slate-50 absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                <h3 class="text-2xl font-bold py-2 text-center mx-auto">${der[i].strCategory}</h3>
                <p class="text-1xl font-bold text-center mx-auto flex justify-center">${der[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>      `
  }
  dateROW.innerHTML = cartoona;
};
categories.addEventListener("click", () => {
  getApi();
  dateinput.innerHTML = ``;
});
async function getCategoryMeals(category) {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  allget = await date.json();
  displayCategory(allget.meals);
  $("#loeding").fadeOut(300);
};
function displayCategory(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div class=" mx-auto p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class=" mt-4 relative overflow-hidden">
        <img class="w-full" src="${arr[i].strMealThumb}" alt="strMealThumb">
        <div
                class="flex items-center ">
                <p  class="text-2xl text-slate-50 font-bold">${arr[i].strMeal}</p>
            </div>
        </div>
    </div>
        `
  };

  dateROW.innerHTML = cartoona;
};
//////////////////////////////////////////////////////////////////////////////////////////////
async function searchAreaApi() {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  allget = await date.json();
  displayarea(allget.meals);
  $("#loeding").fadeOut(300);
};
function displayarea(dern) {
  let cartoona = ``;
  for (let i = 0; i < dern.length; i++) {
    cartoona += `
        <div class=" mx-auto p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
                <div onclick="clickAreaApi('${dern[i].strArea}')" class=" mt-4 relative overflow-hidden">
                    <i class="text-slate-50 flex items-center justify-center fa-solid fa-house-laptop fa-4x"></i>
                    <div
                        class="flex items-center justify-center ">
                        <p  class="text-2xl text-slate-50 font-bold">${dern[i].strArea}</p>
                    </div>
                </div>
            </div>
        `
  }
  dateROW.innerHTML = cartoona;
};
area.addEventListener("click", () => {
  searchAreaApi()
  dateinput.innerHTML = ``;

});
async function clickAreaApi(logarea) {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${logarea}`);
  allget = await date.json();
  displayclick(allget.meals);
  $("#loeding").fadeOut(300);
};
function displayclick(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div  class="allmain  p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="parent group mt-4 relative overflow-hidden">
            <img class="rounded-xl" src="${arr[i].strMealThumb}" alt="images">
            <div
                class="child flex flex-col  text-center justify-center text-2xl font-semibold mx-auto rounded-xl items-center opacity-0 bg-slate-50 absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                ${arr[i].strMeal}
                </div>
        </div>
    </div>
        `
  }
  dateROW.innerHTML = cartoona;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function searchIngredientsApi() {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  allget = await date.json();
  displayIngredients(allget.meals);
  $("#loeding").fadeOut(300);
};
function displayIngredients(derr) {
  let cartoona = ``;
  for (let i = 0; i < derr.length; i++) {
    cartoona += `
        <div class="   p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
        <div onclick="getIngredientsMeals('${derr[i].strIngredient}')" class="parent  mt-4   mx-auto">
                    <i class =" py-6 text-slate-50 text-center mx-auto flex justify-center  fa-solid fa-drumstick-bite fa-4x"></i>
                    <h1 class="text-slate-50  text-center font-bold text-2xl"> ${derr[i].strIngredient}</h1>
             <div
                class="child flex flex-col text-slate-50 text-center mx-auto rounded-xl items-center">
                <p class="text-1xl font-bold py-2 text-center mx-auto">
                ${derr[i].strDescription ? derr[i].strDescription.split(" ").slice(0, 20).join(" ") : ''}
            </p>
             </div>
        </div>
    </div>
        `
  };
  dateROW.innerHTML = cartoona;
};
ingredients.addEventListener("click", () => {
  searchIngredientsApi()
  dateinput.innerHTML = ``;

});
async function getIngredientsMeals(ingredients) {
  $("#loeding").fadeIn(300);
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  allget = await date.json();
  displayclickingredients(allget.meals);
  $("#loeding").fadeOut(300);
};
function displayclickingredients(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += `  
        <div  class="allmain   p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="parent group mt-4 relative overflow-hidden">
            <img class="rounded-xl" src="${arr[i].strMealThumb}" alt="images">
            <div
                class="child flex flex-col justify-center text-2xl text-black font-semibold items-start text-center mx-auto rounded-xl opacity-0 bg-slate-50 absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                ${arr[i].strMeal}
                </div>
        </div>
    </div>
        `
  };

  dateROW.innerHTML = cartoona;
};
search.addEventListener("click", function () {
  dasplaydiv();
  dateROW.innerHTML = ``;
});
async function searchName(term) {
  $("#loeding").fadeIn(300);
  dateROW.innerHTML = "";
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  allget = await date.json();
  allget.meals ? displayMeals(allget.meals) : displayMeals([]);
  $("#loeding").fadeOut(300);
};
function dasplaydiv() {
  let cartoona = "";
  cartoona += `
                <input oninput="searchName(this.value)" type="text" id="name" name="name" placeholder="Search By Name"
                    class="mt-1 p-2 w-1/3 placeholder-italic placeholder-slate-50 bg-transparent mx-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:shadow-md text-white">

                <input oninput="searchByFLetter(this.value)" type="email" id="text" name="name" placeholder="Search By First Letter"
                    class="mt-1 p-2 w-1/3 placeholder-italic placeholder-slate-50 mx-3 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring focus:shadow-md text-white">
        `
  dateinput.innerHTML = cartoona;
};
async function searchByFLetter(term) {
  $("#loeding").fadeIn(300);
  dateROW.innerHTML = "";
  term == "" ? term = "a" : "";
  let date = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  allget = await date.json();
  allget.meals ? displayMeals(allget.meals) : displayMeals([]);
  $("#loeding").fadeOut(300);
};
function displayMeals(arr) {
  let cartoona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartoona += `
        <div  class="allmain   p-5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="parent group mt-4 relative overflow-hidden">
            <img class="rounded-xl" src="${arr[i].strMealThumb}" alt="images">
            <div
                class="child flex flex-col  justify-center font-semibold text-2xl  text-center mx-auto rounded-xl items-start opacity-0 bg-slate-50 absolute left-0 right-0 top-full bottom-0 group-hover:top-0 hover:opacity-75 transition-all">
                ${arr[i].strMeal}
                </div>
        </div>
    </div>
        `
  };
  dateROW.innerHTML = cartoona;
};
function displayContacts() {
  let cartona =`
    <div class="flex  w-1/2 mx-auto ms-32 lg:flex-row justify-center items-center  mt-32 lg:mt-40">
        <div class="w-full flex flex-col p-5 lg:flex-col justify-center lg:items-end pe-3">
            <input onkeyup="inputsregx()" type="text" name="name" id="enterName" placeholder="Enter Your Name"
                class="w-96 border border-white rounded-md bg-white py-2 px-4 text-black foucas:outline-none" />
            <div id="nameAlert"
                class="bg-red-300 w-96 py-2 px-10 mt-1 text-center font-bold text-red-900 rounded-xl hidden">
                Special characters and numbers not allowed
            </div>
            <input onkeyup="inputsregx()" type="text" name="phone" id="enterPhone" placeholder="Enter Your phone"
                class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none" />
            <div id="numberAlert"
                class="bg-red-300 w-96 py-2 px-24 mt-1 text-center font-bold text-red-900 rounded-xl hidden">
                Enter valid Phone Number
            </div>
            <input onkeyup="inputsregx()" type="password" name="password" id="enterPassword"
                placeholder="Enter Your Password"
                class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none" />
            <div id="passowrdAlert"
                class="bg-red-300 py-2 w-96 px-3 mt-1 text-center font-bold text-red-900 rounded-xl hidden">
                Enter valid password
            </div>
        </div>

        <div class="w-full flex flex-col p-5  lg:flex-col justify-center lg:items-start mt-2 lg:mt-0 lg:ps-3">
            <input onkeyup="inputsregx()" type="email" name="email" id="enterEmail" placeholder="Enter Your Email"
                class="w-96 border border-white rounded-md bg-white py-2 px-4 text-black foucas:outline-none" />
            <div id="emailAlert"
                class="bg-red-300 w-96 py-2 px-10 mt-1 text-center font-bold text-red-900 rounded-xl hidden">
                Email not valid *exemple@yyy.zzz <br />
                Enter valid Email
            </div>
            <input onkeyup="inputsregx()" type="number" name="age" id="enterAge" placeholder="Enter Your age"
                class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none" />
            <div id="ageAlert"
                class="bg-red-300 w-96 py-2 px-10 mt-1 text-center font-bold text-red-900 rounded-xl hidden">
                Enter valid age
            </div>
            <input onkeyup="inputsregx()" type="search" name="search" id="enterRePassword" placeholder="Repasword"
                class="w-96 border border-white rounded-md bg-white mt-4 py-2 px-4 text-black foucas:outline-none" />
            <div id="rePasswordAlert"
                class="bg-red-300 w-96 py-2 px-10 mt-1 text-center font-bold text-red-900 rounded-xl hidden">
                Enter valid repassword
            </div>
        </div>


    </div>

    <div class="w-full block">
        <button id="submitBtn" disabled
            class="py-2 px-4 text-red-900 border mx-auto  border-red-900 flex justify-center rounded-xl ms-64 md:mx-auto mt-4 bg-transparent text-center">
            Submit
        </button>
    </div>


  `
  dateROW.innerHTML = cartona;
  dateinput.innerHTML = ``;
    submitBtn = document.getElementById("submitBtn");
  document.getElementById("enterName").addEventListener("focus", () => {
    nameTouched = true
  })

  document.getElementById("enterEmail").addEventListener("focus", () => {
    emailTouched = true
  })

  document.getElementById("enterPhone").addEventListener("focus", () => {
    phoneTouched = true
  })

  document.getElementById("enterAge").addEventListener("focus", () => {
    ageTouched = true
  })

  document.getElementById("enterPassword").addEventListener("focus", () => {
    passwordTouched = true
  })

  document.getElementById("enterRePassword").addEventListener("focus", () => {
    repasswordTouched = true
  })
};
function inputsregx() {
  if (nameTouched) {
    nameregx() ? document.getElementById("nameAlert").classList.replace("block", "hidden"): document.getElementById("nameAlert").classList.replace("hidden", "block");
  }
  if (emailTouched) {
    emailregx() ? document.getElementById("emailAlert").classList.replace("block", "hidden") : document.getElementById("emailAlert").classList.replace("hidden", "block");
  }

  if (phoneTouched) {
    phoneregx() ? document.getElementById("numberAlert").classList.replace("block", "hidden") : document.getElementById("numberAlert").classList.replace("hidden", "block");
  }

  if (ageTouched) {
    ageregx() ? document.getElementById("ageAlert").classList.replace("block", "hidden") : document.getElementById("ageAlert").classList.replace("hidden", "block");
  }

  if (passwordTouched) {
    repasswordregx() ? document.getElementById("passowrdAlert").classList.replace("block", "hidden") : document.getElementById("passowrdAlert").classList.replace("hidden", "block");
    
  }

  if (repasswordTouched) {
    repasswordregx() ? document.getElementById("rePasswordAlert").classList.replace("block", "hidden") : document.getElementById("rePasswordAlert").classList.replace("hidden", "block");
    
  }

  nameregx() && emailregx() && phoneregx() && ageregx() && passwordregx() && repasswordregx()?submitBtn.removeAttribute("disabled"):submitBtn.setAttribute("disabled", true)
  ;
};
function nameregx() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("enterName").value))
};
function emailregx() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("enterEmail").value))
};
function phoneregx() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("enterPhone").value))
};
function ageregx() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("enterAge").value))
};
function passwordregx() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("enterPassword").value))
};
function repasswordregx() {
  return document.getElementById("enterRePassword").value == document.getElementById("enterPassword").value
};
