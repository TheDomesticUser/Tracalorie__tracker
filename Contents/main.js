// Set the event listeners for when the document is loaded
document.addEventListener('DOMContentLoaded', function(){
    // Initialize the classes
    const ui = new UI();
    const locStorage = new LocalStorage();
    const data = new Data();
    
    // Get the meal items from the local storage
    const mealItems = JSON.parse(localStorage.getItem(locStorage.key));
    
    if (mealItems) {
        // Iterate each meal item, appending it into the meal list
        mealItems.forEach(function(mealItem){
            ui.addMeal(mealItem.meal, mealItem.calories);
        });
    }

    // Get the element attributes for adding event listeners
    const addMealButton = document.getElementById('addMeal');
    const backButton = document.getElementById('backButton');
    const clearAllButton = document.getElementById('clearAll');
    const editMealIcons = document.querySelectorAll('i.fa.fa-pencil');
    
    // Set the event listeners for adding, editing, and deleting meals
    addMealButton.addEventListener('click', addMeal);
    backButton.addEventListener('click', hideEditOptions);
    clearAllButton.addEventListener('click', clearMeals);
    
    /* Iterate through each icon, adding an event listener for when it is clicked
        and add it to the total calories */
    editMealIcons.forEach(function(mealIcon) {
        // Get the calorie amount
        const calories = mealIcon.parentElement.parentElement.firstElementChild
        .nextElementSibling.firstElementChild.textContent;
        
        // Add the calories to the total amount
        data.changeCalories(calories);
    
        // Add the edit meal event listener to the meal icon
        data.addEventListenerToEditMeal(mealIcon);
    });

    function addMeal(e) {
        data.addMeal();
    
        e.preventDefault();
    }
    
    function hideEditOptions(e) {
        ui.hideEditMealOptions(addMealButton);
    
        e.preventDefault();
    }
    
    function clearMeals(e) {
        // Clear all the list item meals in the UI
        ui.clearMeals();
    
        // Set the calorie amount to 0 in the UI
        ui.setCalorieAmount(0);
    
        // Clear all the meals from the local storage
        locStorage.clearMealInfos();
    
        e.preventDefault();
    }
});


