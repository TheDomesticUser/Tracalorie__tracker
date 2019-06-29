function LocalStorage()
{
    this.key = 'meals';
}

LocalStorage.prototype.setMealInfo = function(meal, calories) {
    /* Get the meal items from the local storage. 
        If there aren't any, set an empty array. */
    let mealItems = JSON.parse(window.localStorage.getItem(this.key));

    if (!mealItems) mealItems = [];

    // Add the meal item object to the array
    mealItems.push({
        meal,
        calories
    });

    // Set the local storage item to the meal items array
    window.localStorage.setItem(this.key, JSON.stringify(mealItems));
}

LocalStorage.prototype.removeMealInfo = function(meal, calories) {
    // Get the meal items from the local storage
    const mealItems = JSON.parse(window.localStorage.getItem(this.key));

    /* Iterate through the meal items, checking if the 
    information matches and removing the meal item */
    mealItems.forEach(function(mealItem, index){
        if (mealItem.meal === meal && mealItem.calories === calories) {
            mealItems.splice(index, 1);
        }
    });

    // Set the meal item array in the local storage
    localStorage.setItem(this.key, JSON.stringify(mealItems));
}

LocalStorage.prototype.updateMealInfo = 
function(originalMeal, originalCalories, updatedMeal, updatedCalories) {
    // Get the meal items from the local storage
    const mealItems = JSON.parse(window.localStorage.getItem(this.key));
    
    /* Iterate through the meal items array, finding the index 
    of the original meal object and changing it to the updated meal object */
    mealItems.forEach(function(mealItem){
        if (mealItem.meal === originalMeal && mealItem.calories === originalCalories) {
            mealItem.meal = updatedMeal;
            mealItem.calories = updatedCalories;
        }
    });

    // Set the meal item in the local storage
    window.localStorage.setItem(this.key, JSON.stringify(mealItems));
}

LocalStorage.prototype.clearMealInfos = function() {
    window.localStorage.removeItem(this.key);
}