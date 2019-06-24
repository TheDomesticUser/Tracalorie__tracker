// Initialize the class
const ui = new UI();
const localStorage = new LocalStorage();

// Get the element attributes for adding event listeners
const addMealButton = document.getElementById('addMeal');
const backButton = document.getElementById('backButton');
const editMealIcons = document.querySelectorAll()

// Set the event listeners for adding, editing, and deleting meals
addMealButton.addEventListener('click', addMeal);

function addMeal(e) {
    // Get the meal information inputs
    const itemName = document.getElementById('item-name').value;
    const calories = document.getElementById('item-calories').value;

    ui.addMeal(itemName, calories);

    e.preventDefault();
}