function UI()
{
    
}

UI.prototype.addMeal = function(itemName, calories) {
    // Get the unordered list for appendation
    const mealList = document.getElementById('item-list');

    // Create the meal list item for appendation
    const mealListItem = document.createElement('li');
    mealListItem.className = 'collection-item';
    mealListItem.id = 'item-0';
    mealListItem.innerHTML = `
        <strong>${itemName}: </strong><em>${calories} Calories</em>
        <a href="#" class="secondary-content">
        <i class="fa fa-pencil"></i>
        </a>
    `;
    // Append the meal list item to the list
    mealList.appendChild(mealListItem);
    
    // Show the success message
    this.showMessage('Item was successfully added!', 'success');
}

UI.prototype.updateMeal = function(itemName, calories, mealListItem) {
    if (itemName.length === 0 || calories.length === 0) {
        this.showMessage('Please input the meal item and calories you would like to be updated.', 'error');
    } else if (isNaN(calories)) {
        this.showMessage('Please input a number for the amount of calories.', 'error');
    } else {
        // Change the text content of the meal item name
        mealListItem.firstElementChild.textContent = `${itemName}: `;

        // Change the text content of the number of calories element
        mealListItem.firstElementChild.nextElementSibling.textContent = `${calories} Calories`;

        this.hideEditMealOptions(document.getElementById('addMeal'), document.getElementById('updateMeal'),
        document.getElementById('deleteMeal'));

        this.showMessage('Meal item successfully updated!', 'success');
    
    }
}

UI.prototype.clearMeals = function() {
    // Get all of the list items in the meal list
    const mealListItems = document.querySelectorAll('ul#item-list li#item-0');

    mealListItems.forEach(function(listItem){
        listItem.remove();
    });
}

UI.prototype.showEditMealOptions = function(addMealButton, updateMealButton, deleteMealButton) {
    addMealButton.style.visibility = 'hidden';
    updateMealButton.style.visibility = 'visible';
    deleteMealButton.style.visibility = 'visible';
}

UI.prototype.hideEditMealOptions = function(addMealButton, updateMealButton, deleteMealButton) {
    addMealButton.style.visibility = 'visible';
    updateMealButton.style.visibility = 'hidden';
    deleteMealButton.style.visibility = 'hidden';
}

UI.prototype.showMessage = function(message, id) {
    // Get the meal menu for inserting before
    const mealMenu = document.getElementById('mealMenu');

    // Create the message paragraph
    const messageParagraph = document.createElement('p');
    messageParagraph.id = id;
    messageParagraph.appendChild(document.createTextNode(message));

    // Insert paragraph before the menu
    document.body.insertBefore(messageParagraph, mealMenu);
    
    // Set the timeout for the message after 3 seconds
    setTimeout(() => messageParagraph.remove(), 3000);
}