// Load recipes from localStorage
let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");
const searchBar = document.getElementById("searchBar");

function saveRecipes() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function displayRecipes(filter = "") {
    recipeList.innerHTML = "";

    let filteredRecipes = recipes.filter(r =>
        r.title.toLowerCase().includes(filter.toLowerCase())
    );

    filteredRecipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
            <p><strong>Calories:</strong> ${recipe.calories}</p>
            <button class="delete-btn" onclick="deleteRecipe(${index})">Delete</button>
        `;

        recipeList.appendChild(card);
    });
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    saveRecipes();
    displayRecipes();
}

// Add recipe form
recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value.split(",");
    const calories = document.getElementById("calories").value;

    recipes.push({
        title,
        ingredients,
        calories
    });

    saveRecipes();
    displayRecipes();

    recipeForm.reset();
});

// Search functionality
searchBar.addEventListener("input", (e) => {
    displayRecipes(e.target.value);
});

// Initial display
displayRecipes();
