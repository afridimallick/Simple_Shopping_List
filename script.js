const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function displayItems (){
    const itemsFromStorage = getItemsFromLocalStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
}
// Adding Items to DOM and Local Storage

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

if(newItem === '') {
    alert('Please Add an item')
    return;
}

addItemToDOM(newItem);
addItemToStorage(newItem);
checkUI();
itemInput.value = '';
}

// ------------------------------------------------------------------------------------------------
function addItemToDOM(item){
    const li = document.createElement('li')
       li.appendChild(document.createTextNode(item))
    const button = createButton('remove-item btn-link text-red')
       li.appendChild(button);
    itemList.appendChild(li);
}


function addItemToStorage(item){
    const itemsFromStorage = getItemsFromLocalStorage();

       // Adding new Item to Storage
          itemsFromStorage.push(item);

       // Stringigying the Array
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
// ------------------------------------------------------------------------------------------------

// Display Items from Local Storage

function getItemsFromLocalStorage(){
// checking if Local Storage - empty / arrayfying it 
if(localStorage.getItem('items') === null){
    itemsFromStorage = []; }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}



//             Creating a Button for Item List
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon)
    return button;
}

//             Creating a 'x' icon for Item List
function createIcon(classes) {
const icon = document.createElement('i');
icon.className = classes;
return icon;
}

function onClickItem(e){
    if(e.target.parentNode.classList.contains('remove-item')){
        removeItem(e.target.parentNode.parentNode);
}
}

function removeItem(item) {
    if(confirm('Are you sure?')){
        // Remnove Item from DOM
        item.remove();

        // Remove Item from Storage 
        removeItemFromStorage(item.textContent);
        checkUI();
}
}

function removeItemFromStorage(item){
let itemsFromStorage = getItemsFromLocalStorage();
// Filter Out item to be removed
itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

// Re-set to localStorage
localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e){
    if(confirm('Are you sure?')){
    if(e.target.classList.contains('btn-clear')){
        itemList.innerHTML = '';

        // Clear from LocalStorage

        localStorage.removeItem('items');
        checkUI();
    } } }

// ------------------------------------------------------------------------------------------------

function filterItems(e) {
 const items = itemList.querySelectorAll('li')
 const text = e.target.value.toLowerCase();

 items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    
    if(itemName.indexOf(text) != -1) {
        item.style.display = 'flex';
    } else {
        item.style.display = 'none';
        }   }); }
 

function checkUI() {
    const items = itemList.querySelectorAll('li')
    if(items.length === 0){
        clearBtn.style.display = 'none'; 
        itemFilter.style.display = 'none'; }
        else{
            clearBtn.style.display = 'block'; 
            itemFilter.style.display = 'block'   
        }
}

// Initiaze App
function init() {
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
}

init();
