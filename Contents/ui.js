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
}

UI.prototype.updateMeal = function(mealListItem, itemName, calories) {
    // Change the text content of the meal item name
    mealListItem.firstElementChild.textContent = `${itemName}: `;
    
    // Change the text content of the number of calories element
    mealListItem.firstElementChild.nextElementSibling.textContent = `${calories} Calories`;
}

UI.prototype.deleteMeal = function(mealListItem) {
    mealListItem.remove();
}

UI.prototype.clearMeals = function() {
    // Get all of the list items in the meal list
    const mealListItems = document.querySelectorAll('ul#item-list li#item-0');

    mealListItems.forEach(function(listItem){
        listItem.remove();
    });
}

UI.prototype.clearAllInputs = function() {
    // Get all of the inputs for setting their values to null
    document.querySelectorAll('input').forEach(function(input){
        input.value = null;
    });
}

UI.prototype.hideEditMealOptions = function(addMealBtn) {
    // Get the update and delete meal buttons
    const updateMealButton = document.getElementById('updateMeal');
    const deleteMealButton = document.getElementById('deleteMeal');
   
    if (updateMealButton && deleteMealButton) {
        updateMealButton.remove();
        deleteMealButton.remove();
        
        // Get the back button for inserting before
        const backButton = document.getElementById('backButton');
        
        // Insert the add meal button before the back button
        document.getElementById('mealFormRow').insertBefore(
            addMealBtn, backButton
        );
    }
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

UI.prototype.setCalorieAmount = function(calories) {
    // Change the span total calories amount
    document.querySelector('h3.counter-align span.total-calories')
    .textContent = calories;
}