function Data()
{
    
}

Data.prototype.addMeal = function(e) {
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
        new Data().addEventListenerToEditMeal(editMealIcon);
        
        ui.showMessage('Item meal was successfully added!', 'success');

        // Clear all of the inputs
        ui.clearAllInputs();
    }

    e.preventDefault();
}

Data.prototype.addEventListenerToEditMeal = function(mealIcon) {
    mealIcon.addEventListener('click', function() {
        const ui = new UI();
        
        // Get the meal form row for inserting before
        const mealFormRow = document.getElementById('mealFormRow');
        
        // Get the buttons for inserting, verifying, and adding event listeners
        const addMealButton = document.getElementById('addMeal');
        const backButton = document.getElementById('backButton');
        
        if (addMealButton) {
            // Remove the add meal button
            addMealButton.remove();
            
            // Create the update meal button, and set its values
            const updateMealButton = document.createElement('button');
            updateMealButton.id = 'updateMeal';
            updateMealButton.classList.add('update-btn');
            updateMealButton.classList.add('btn');
            updateMealButton.classList.add('orange');
            updateMealButton.innerHTML = `
                <i class="fa fa-pencil-square-o"></i>Update Meal
            `;
            
            // Create the delete meal button, and  set its values
            const deleteMealButton = document.createElement('button');
            deleteMealButton.id = 'deleteMeal';
            deleteMealButton.classList.add('delete-btn');
            deleteMealButton.classList.add('btn');
            deleteMealButton.classList.add('red');
            deleteMealButton.innerHTML = `
                <i class="fa fa-remove"></i>Delete Meal
            `;
                
            // Insert the buttons
            mealFormRow.insertBefore(updateMealButton, backButton);
            mealFormRow.insertBefore(deleteMealButton, backButton);
            
            // Add the event listeners for the buttons
            updateMealButton.addEventListener('click', function(){
                const meal = document.getElementById('item-name').value;
                const calories = document.getElementById('item-calories').value;

                if (meal.length === 0 || calories.length === 0) {
                    ui.showMessage('Please fill in the meal and calories to be updated.', 'error');
                } else if (isNaN(calories)) {
                    ui.showMessage('Please input a number for the amount of the calories.', 'error');
                } else {
                    // Get the meal list item
                    const mealListItem = mealIcon.parentElement.parentElement;
                    
                    ui.updateMeal(mealListItem, meal, calories);
                    ui.hideEditMealOptions(addMealButton, updateMealButton, deleteMealButton);
                    ui.clearAllInputs();
                    ui.showMessage('Meal item was successfully updated!', 'success');
                }
            });
        }
    });
}

