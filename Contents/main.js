// Initialize the class
const ui = new UI();
const localStorage = new LocalStorage();
const data = new Data();

// Get the element attributes for adding event listeners
const addMealButton = document.getElementById('addMeal');
const backButton = document.getElementById('backButton');
const clearAllButton = document.getElementById('clearAll');
const editMealIcons = document.querySelectorAll('i.fa.fa-pencil');

// Set the event listeners for adding, editing, and deleting meals
addMealButton.addEventListener('click', data.addMeal);
backButton.addEventListener('click', hideEditOptions);
clearAllButton.addEventListener('click', ui.clearMeals);

function hideEditOptions(e) {
    ui.hideEditMealOptions(addMealButton);

    e.preventDefault();
}

// Iterate through each icon, adding an event listener for when it is clicked
editMealIcons.forEach(function(mealIcon) {
    data.addEventListenerToEditMeal(mealIcon);
});
