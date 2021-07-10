const search = document.getElementById('search-button');
const mealList = document.getElementById('meal');

search.addEventListener('click', getMealList);

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let htmlCode = "";
            if(data.meals) {
                data.meals.forEach(meal => {
                    htmlCode += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>`
                    ;
                });
                mealList.classList.remove('notFound');
            }else {
                htmlCode = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML =htmlCode;
        });
}