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
        ui.showMessage('Please fill in all inputs when adding a meal!', 'error');
    } else if (isNaN(calories)) {
        ui.showMessage('Please input a number for the amount of calories.', 'error');
    } else {
        ui.addMeal(itemName, calories);
    
        // Get the newly added meal icon for adding an event listener to the edit icon
        const editMealIcon = document.getElementById('item-list')
        .lastElementChild.lastElementChild.firstElementChild;
        
        // Add the event listener for editing the meal
        new Data().addEventListenerToEditMeal(editMealIcon, ui);
        
        ui.showMessage('Item meal was successfully added!', 'success');

        // Clear all of the inputs
        ui.clearAllInputs();
    }

    e.preventDefault();
}

Data.prototype.addEventListenerToEditMeal = (mealIcon) => {
    const ui = new UI();
    
    mealIcon.addEventListener('click', function(icon) {
        /* Get all of the meal buttons for hiding, showing,
        and adding event listeners to them */
        const addMealButton = document.getElementById('addMeal');
        const updateMealButton = document.getElementById('updateMeal');
        const deleteMealButton = document.getElementById('deleteMeal');
        const backButton = document.getElementById('backButton');

        // Get the meal list item
        const mealListItem = icon.target.parentElement.parentElement;

        ui.showEditMealOptions(true);

        updateMealButton.addEventListener('click', function(e){
            // Get the meal information inputs
            const mealItem = document.getElementById('item-name').value;
            const calories = document.getElementById('item-calories').value;

            if (mealItem.length === 0 || calories.length === 0) {
                ui.showMessage('Please input the meal item and calories you would like to be updated.', 'error');
            } else if (isNaN(calories)) {
                ui.showMessage('Please input a number for the amount of calories.', 'error');
            } else {
                ui.updateMeal(mealItem, calories, mealListItem);

                // Hide the edit meal options when updated
                ui.showEditMealOptions(false);

                // Show success update message
                ui.showMessage('Meal item successfully updated!', 'success');

                // Clear all of the inputs
                ui.clearAllInputs();
            }

            e.preventDefault();
        });

        deleteMealButton.addEventListener('click', function(e){
            // Traverse to the list item, and remove it
            mealListItem.remove();

            ui.showEditMealOptions(false);
        
            e.preventDefault();
        });

        backButton.addEventListener('click', function(e){
            ui.showEditMealOptions(false);
        
            e.preventDefault();
        });

        icon.preventDefault();
    });
}

