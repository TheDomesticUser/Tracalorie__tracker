function UI()
{
    
}

UI.prototype.addMeal = function(itemName, calories) {
    if (itemName.length === 0 || calories.length === 0) {
        this.showMessage('Please fill in all inputs when adding a meal!', 'error');
    } else if (isNaN(calories)) {
        this.showMessage('Please input a number for the amount of calories.', 'error');
    } else {
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
    setTimeout(function(){
        messageParagraph.remove();
    }, 3000);
}