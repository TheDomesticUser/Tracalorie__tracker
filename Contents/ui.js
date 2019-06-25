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

UI.prototype.updateMeal = function(itemName, calories, mealListItem) {
    // Change the text content of the meal item name
    mealListItem.firstElementChild.textContent = `${itemName}: `;

    // Change the text content of the number of calories element
    mealListItem.firstElementChild.nextElementSibling.textContent = `${calories} Calories`;
}

UI.prototype.deleteMeal = function(mealListItem) {
    mealListItem.remove();

    new UI().hideEditMealOptions();
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

UI.prototype.showEditMealOptions = function(trueOrFalse) {
    const addMealButton = document.getElementById('addMeal');
    const updateMealButton = document.getElementById('updateMeal');
    const deleteMealButton = document.getElementById('deleteMeal');

    if (trueOrFalse) {
        addMealButton.style.visibility = 'hidden';
        updateMealButton.style.visibility = 'visible';
        deleteMealButton.style.visibility = 'visible';
    } else {
        addMealButton.style.visibility = 'visible';
        updateMealButton.style.visibility = 'hidden';
        deleteMealButton.style.visibility = 'hidden';
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