async function mealsApi(name = '') {
    $(".inner-loading-screen").fadeIn(300)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const response = await api.json()
    const meals = response.meals
    displayMeals(meals, '.main-items')
}

mealsApi();


$(document).ready(() => {

    $("#loading-screen").fadeOut(500)
    $("body").removeClass("overflow-hidden")
});


function displayMeals(response, className) {
    let blackBox = '';
    for (let i = 0; i < response.length; i++) {
        blackBox += `
      <div class="col-md-3" onclick='getIngredients("${response[i].strMeal}")' >
      <div class="item rounded-2  position-relative overflow-hidden" >
         <div class="img-item">
          <img id="meal-img" src="${response[i].strMealThumb}" class="w-100 rounded-2" alt="">
         </div>
         <div class="meal-title rounded-2 position-absolute top-0 start-0 bottom-0 end-0  d-flex justify-content-center align-items-center ">
          <p class="fs-2 fw-bold text-capitalize ">${response[i].strMeal}</p>
         </div>
      </div>
  </div>
      `

    }
    $(className).html(blackBox);


}

async function getIngredients(name) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const response = await api.json()
    const meal = response.meals
    displayInstructions(meal[0]);
    $('#instructions-sec').removeClass('d-none');
    $('body').addClass('overflow-hidden')
}




function displayInstructions(response) {
    let blackBox = '';
    let recieps = '';
    for (let i = 1; i < 20; i++) {
        if (response[`strIngredient${[i]}`]) {
            recieps += `<span class="bg-info px-2 py-1 rounded-3 ">${response[`strMeasure${i}`]} ${response[`strIngredient${[i]}`]} </span>`
      }
    }
  
    let box = '';
    if(response.strTags !== null){
      let tags = response.strTags.split(',');
      for(let i = 0 ; i<tags.length; i++){
        box += `<span class="bg-danger px-2 py-1 rounded-3">${tags[i]}</span>`
      }
    }
    blackBox = `
    <div class="col-md-6">
  <div class="item-img">
  <img src="${response.strMealThumb}" class="w-100 rounded-2" alt="">
  <p class="py-3 fs-3">${response.strMeal}</p>
  </div>
  </div>
  <div class="col-md-6">
  <div class="instrucions-sec">
  <h2>Instructions</h2>
  <p >${response.strInstructions}</p>
  <p class="fs-2 fw-bold ">Area : <span>${response.strArea}</span></p>
  <p class="fs-2 fw-bold">Category : <span>${response.strCategory}</span></p>
  <h3 class="mb-1">recieps :</h3>
  <div class="recieps py-4 d-flex flex-wrap gap-2">
  ${recieps}
  </div>
  <h3 class="mb-1">Tags :</h3>
  <div class="tags py-4  d-flex flex-wrap gap-2">
      ${box}
  </div>
  <a class="btn btn-success" href="${response.strSource}">Source</a>
  <a class="btn btn-danger" href="${response.strYoutube}">Youtube</a>
  </div>
  </div>
    `;
  
    $('#instructions').html(blackBox);
  }
  
  $('.main-side').hide()
  $(".links li").animate({
    top: 300
  }, 500)
  
  
  $('.close-side').on('click', closeOpenSide);
  
  function closeOpenSide() {
    $('.open-side').removeClass('d-none');
    $('.close-side').addClass('d-none')
    $('.main-side').hide(500)
    $('.contact').fadeOut(500)
    $(".links li").animate({
      top: 300
  }, 500)
  openSide()
  }
  function openSide() {
  $('.open-side').on('click', ()=>{
    $('.close-side').removeClass('d-none');
    $('.open-side').addClass('d-none')
    $('.main-side').show(500)
    $('.contact').fadeIn(500)
    $(".links li").animate({
      top: 0
  }, 500)
  })
  }
  
  closeOpenSide();
  
  
  
  
    function closeAll() {
      $('#search').addClass('d-none');
      $('#categories').addClass('d-none');
      $('#area').addClass('d-none');
      $('#instructions-sec').addClass('d-none');
      $('#contactUs').addClass('d-none');
      $('#ingredients').addClass('d-none');
      $("body").removeClass('overflow-hidden')
    }
  
  
    $('.links li ').on('click',(e)=> {
    closeAll();
  
      const listId =e.target.textContent.trim()
      $('body').addClass('overflow-hidden');
      closeOpenSide()
  $(`#${listId}`).removeClass('d-none')
    })
    
  
  
  
    async function getSearchByFirst (name) {
      const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
      const response = await api.json();
    const meals = response.meals
    meals ? displayMeals(meals , '.search-items') : displayMeals([], '.search-items')
      
    }
  
  
  
  
   async function  serchByName(name) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const response = await api.json()
    const meals = response.meals
    meals ? displayMeals(meals , '.search-items') : displayMeals([], '.search-items')
  
  }
  
   
  async function getCategory() {
    $(".inner-loading-screen").fadeIn(300)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const response = await api.json()
    const meals = response.categories
    displayCategory(meals , '.category-items')
  }
  
  function displayCategory(response, className) {
    let blackBox='';
    for(let i =0 ; i<response.length; i++)  {
      blackBox+=`
      <div class="col-md-3" onclick='filterCategory("${response[i].strCategory}")'>
      <div class="item-cat rounded-2  position-relative overflow-hidden" >
         <div class="img-item-cat">
          <img id="meal-img-cat" src="${response[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
         </div>
         <div class="meal-title-cat d-flex flex-column rounded-2 position-absolute top-0 start-0 bottom-0 end-0  d-flex justify-content-center align-items-center ">
          <p class="cat-title fs-3  text-capitalize p-1 ">${response[i].strCategory}</p>
          <p class=" cat-desc text-capitalize  p-1" >${response[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
         </div>
      </div>
  </div>
      `
      $('.cat-desc').css("font-size","10px");
  
     
    }
  
    
    $(className).html(blackBox);
  
    
  }
  getCategory();
  
  
  
  
  async function filterCategory(category) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    const response = await api.json()
    const meals = response.meals
    closeAll()
    displayMeals(meals,'.main-items')
  }
  
  
  async function getArea() {
    $(".inner-loading-screen").fadeIn(300)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const response = await api.json()
    const meals = response.meals
    displayArea(meals , '.area-items')
  }
  
  getArea()
  
  function displayArea(area , className) {
    let blackBox='';
    for(let i =0 ; i<area.length; i++)  {
      blackBox+=`
      <div class="col-md-3" onclick='filterArea("${area[i].strArea}")' >
      <div class="item-area rounded-2  position-relative overflow-hidden" >
     
         <i class="fa-solid fa-house-laptop  "></i>
       
          <p class="area-title fs-3  text-capitalize p-1 ">${area[i].strArea}</p>
         
      </div>
  </div>
      `
  }
  
  $(className).html(blackBox);
  }
  
  async function filterArea(area) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    const response = await api.json()
    const meals = response.meals
    closeAll()
    displayMeals(meals,'.main-items')
  }
  
  
  async function getingred() {
    $(".inner-loading-screen").fadeIn(300)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const response = await api.json()
    const meals = response.meals
    displayingred(meals , '.ingred-items')
  }
  
  function displayingred(ingred, className) {
    let blackBox='';
    for(let i =0 ; i<20; i++)  {
      blackBox+=`
      <div class="col-md-3" onclick='filteringred("${ingred[i].strIngredient}")' >
      <div class="item-ing rounded-2  position-relative overflow-hidden" >
     
      <i class="fa-solid fa-drumstick-bite"></i>
       
          <p class="ingred-title fs-3  text-capitalize p-1 ">${ingred[i].strIngredient}</p>
          <p class="ingred-title fs-6  text-capitalize p-1 ">${ingred[i].strDescription.split(" ").slice(0,10).join(" ")}</p>
         
      </div>
  </div>
      `
    }
    $(className).html(blackBox);
  }
  
  getingred();
  
  
  async function filteringred(ingred) {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`)
    const response = await api.json()
    const meals = response.meals;
    closeAll();
    displayMeals(meals,'.main-items');
  }
  
  
  
  
  
  
  let nameEnterd =false;
  let emailEnterd =false;
  let phoneEnterd=false;
  let ageEnterd =false;
  let passEnterd= false;
  let repassEnterd =false;
  let nameInput = document.getElementById('name')
  let emailInput = document.getElementById('email')
  let phoneInput = document.getElementById('phone')
  let ageInput = document.getElementById('age')
  let passInput = document.getElementById('pass')
  let repassInput = document.getElementById('repass')
  
  nameInput.addEventListener("focus",()=>{
    nameEnterd = true
  })
  emailInput.addEventListener("focus",()=>{
    emailEnterd = true
  })
  phoneInput.addEventListener("focus",()=>{
    phoneEnterd = true
  })
  ageInput.addEventListener("focus",()=>{
    ageEnterd = true
  })
  passInput.addEventListener("focus",()=>{
    passEnterd = true
  })
  repassInput.addEventListener("focus",()=>{
    repassEnterd = true
  })
  
  
  
  function validateName() {
    let regex = /^[a-z A-Z 0-9]+$/;
    let isVAlid = regex.test(nameInput.value);
    return isVAlid;
    
  }
  function validateEmail() {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let isVAlid = regex.test(emailInput.value);
    return isVAlid;
  }
  function validatePhone() {
    let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/;
    let isVAlid = regex.test(phoneInput.value);
    return isVAlid;
  }
  function validateAge() {
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    let isVAlid = regex.test(ageInput.value);
    return isVAlid;
  }
  function validatePass() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isVAlid= regex.test(passInput.value);
    return isVAlid;
  }
  function validateRepass() {
    if(validatePass()) {
      if(passInput.value === repassInput.value) {
        return true
      }else {
        return false
      }
    }
  }
  
  
  function validation() {
    if (nameEnterd) {
      if(validateName()) {
        document.getElementById('nameAlert').classList.replace('d-block' , 'd-none')
      }else {
        document.getElementById('nameAlert').classList.replace('d-none' , 'd-block')
      }
    }
    if (emailEnterd) {
      if(validateEmail()) {
        document.getElementById('emailAlert').classList.replace('d-block' , 'd-none')
      }else {
        document.getElementById('emailAlert').classList.replace('d-none' , 'd-block')
      }
    }
    if (phoneEnterd) {
      if(validatePhone()) {
        document.getElementById('phoneAlert').classList.replace('d-block' , 'd-none')
      }else {
        document.getElementById('phoneAlert').classList.replace('d-none' , 'd-block')
      }
    }
    if (ageEnterd) {
      if(validateAge()) {
        document.getElementById('ageAlert').classList.replace('d-block' , 'd-none')
      }else {
        document.getElementById('ageAlert').classList.replace('d-none' , 'd-block')
      }
    }
    if (passEnterd) {
      if(validatePass()) {
        document.getElementById('passAlert').classList.replace('d-block' , 'd-none')
      }else {
        document.getElementById('passAlert').classList.replace('d-none' , 'd-block')
      }
    }
    if (repassEnterd) {
      if(validateRepass()) {
        document.getElementById('repassAlert').classList.replace('d-block' , 'd-none')
      }else {
        document.getElementById('repassAlert').classList.replace('d-none' , 'd-block')
      }
    }
    
    
    if(validateName()&& validateEmail()&&validatePhone()&&validateAge()&&validatePass()&& validateRepass()) {
      $('#form-btn').removeClass('disabled');
      $('#form-btn').addClass('btn-danger');
      $('#form-btn').addClass('text-white');
    }else {
      $('#form-btn').addClass('text-danger');
  
    }
  }