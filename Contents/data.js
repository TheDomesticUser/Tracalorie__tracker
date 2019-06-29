function Data()
{

}

Data.prototype.addMeal = function() {
    // Initialize the classes
    const ui = new UI();
    const locStorage = new LocalStorage();

    // Get the meal information inputs
    const itemName = document.getElementById('item-name').value;
    const calories = document.getElementById('item-calories').value;

    if (itemName.length === 0 || calories.length === 0) {
        ui.showMessage('Please fill in all inputs when adding a meal!', 'error');
    } else if (isNaN(calories)) {
        ui.showMessage('Please input a number for the amount of calories.', 'error');
    } else {
        // Add the meal list item in the UI
        ui.addMeal(itemName, calories);

        // Add the meal item to the local storage
        locStorage.setMealInfo(itemName, calories);
    
        // Get the newly added meal icon for adding an event listener to the edit icon
        const editMealIcon = document.getElementById('item-list')
        .lastElementChild.lastElementChild.firstElementChild;
        
        // Change the calorie amount
        this.changeCalories(calories);

        // Add the event listener for editing the meal
        this.addEventListenerToEditMeal(editMealIcon);
        
        // Clear all of the inputs
        ui.clearAllInputs();
    }
}

Data.prototype.addEventListenerToEditMeal = function(pencilIcon) {
    // Initialize 'this'
    const self = this;

    pencilIcon.addEventListener('click', function(icon) {
        // Initialize the necessary classes
        const ui = new UI();
        const locStorage = new LocalStorage();
        
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
            updateMealButton.addEventListener('click', function(e){                
                const meal = document.getElementById('item-name').value;
                const calories = document.getElementById('item-calories').value;

                if (meal.length === 0 || calories.length === 0) {
                    ui.showMessage('Please fill in the meal and calories to be updated.', 'error');
                } else if (isNaN(calories)) {
                    ui.showMessage('Please input a number for the amount of the calories.', 'error');
                } else {
                    // Get the original meals and calories for calculation and manipulation
                    const originalMeal = pencilIcon.parentElement.parentElement
                    .firstElementChild.firstElementChild.textContent;
                    const originalCalories = pencilIcon.parentElement
                    .previousElementSibling.firstElementChild.textContent;
                    
                    // Get the meal list item
                    const mealListItem = pencilIcon.parentElement.parentElement;
                    
                    // Add or subtract the calories depending on its condition
                    self.changeCalories(calories - originalCalories);
                    
                    // Update the meal list item in the UI
                    ui.updateMeal(mealListItem, meal, calories);

                    // Update the meal in the local storage
                    locStorage.updateMealInfo(originalMeal, originalCalories, meal, calories);

                    ui.hideEditMealOptions(addMealButton);
                    ui.clearAllInputs();
                }

                e.preventDefault();
            });

            deleteMealButton.addEventListener('click', function(e) {
                // Get the meal information
                const meal = pencilIcon.parentElement.parentElement
                .firstElementChild.firstElementChild.textContent;
                const calAmount = pencilIcon.parentElement.parentElement.firstElementChild
                .nextElementSibling.firstElementChild.textContent;

                // Get the list item
                const mealListItem = pencilIcon.parentElement.parentElement;

                // Remove the meal list item
                ui.deleteMeal(mealListItem);

                // Subtract the total by the calorie amount
                self.changeCalories(-calAmount);

                // Remove the meal item from the local storage
                locStorage.removeMealInfo(meal, calAmount);

                ui.hideEditMealOptions(addMealButton);
                
                e.preventDefault();
            });
        }

        icon.preventDefault();
    });
}

Data.prototype.changeCalories = function(calAmount) {
    // Initialize the UI class
    const ui = new UI();

    // Get the calorie amount
    const calorieAmount = parseInt(document.querySelector('h3.counter-align span.total-calories').textContent);
    
    // Change the total calories through the UI
    ui.setCalorieAmount(calorieAmount + parseInt(calAmount));
}
