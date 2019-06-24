function Data()
{

}

Data.prototype.addMeal = (e) => {
    // Initialize the UI class
    const ui = new UI();

    // Get the meal information inputs
    const itemName = document.getElementById('item-name').value;
    const calories = document.getElementById('item-calories').value;

    if (itemName.length === 0 || calories.length === 0) {
        this.showMessage('Please fill in all inputs when adding a meal!', 'error');
    } else if (isNaN(calories)) {
        this.showMessage('Please input a number for the amount of calories.', 'error');
    } else {
        ui.addMeal(itemName, calories);
    
        // Get the newly added meal icon for adding an event listener to the edit icon
        const editMealIcon = document.getElementById('item-list')
        .lastElementChild.lastElementChild.firstElementChild;
        
        // Add the event listener for editing the meal
        new Data().addEventListenerToEditMeal(editMealIcon, ui);
    }

    e.preventDefault();
}

Data.prototype.addEventListenerToEditMeal = (mealIcon, UI) => {
    mealIcon.addEventListener('click', function(icon) {
        /* Get all of the meal buttons for hiding, showing,
        and adding event listeners to them */
        const addMealButton = document.getElementById('addMeal');
        const updateMealButton = document.getElementById('updateMeal');
        const deleteMealButton = document.getElementById('deleteMeal');
        const backButton = document.getElementById('backButton');

        // Get the meal list item
        const mealListItem = icon.target.parentElement.parentElement;

        UI.showEditMealOptions(addMealButton, updateMealButton, deleteMealButton);

        updateMealButton.addEventListener('click', function(e){
            // Get the meal information inputs
            const mealItem = document.getElementById('item-name').value;
            const calories = document.getElementById('item-calories').value;

            UI.updateMeal(mealItem, calories, mealListItem);

            e.preventDefault();
        });

        deleteMealButton.addEventListener('click', function(e){
            // Traverse to the list item, and remove it
            mealListItem.remove();

            UI.hideEditMealOptions(addMealButton, updateMealButton, deleteMealButton);
            UI.showMessage('Meal item successfully deleted!', 'success');
        
            e.preventDefault();
        });

        backButton.addEventListener('click', function(e){
            UI.hideEditMealOptions(addMealButton, updateMealButton, deleteMealButton);
        
            e.preventDefault();
        });
    });
}

