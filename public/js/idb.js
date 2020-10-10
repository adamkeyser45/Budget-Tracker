// creates a variable to hold the db connection
let db;

// establish a connection to IndexedDB database and set it to version 1
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) and set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_budget', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function(event) {
    // when db is successfully created with its object store or simply established a connection, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run uploadBudget() function to send all local db data to api
    if (navigator.onLine) {
      uploadBudget();
    }
};
  
request.onerror = function(event) {
    // log error here
    console.log("Error: " + event.target.errorCode);
};

// This function will be executed if we attempt to submit a new budget and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_budget'], 'readwrite');
  
    // access the object store for `new_pizza`
    const budgetObjectStore = transaction.objectStore('new_budget');
  
    // add record to your store with add method
    budgetObjectStore.add(record);
};

function uploadBudget() {
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_budget');
    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(() => {
               
                const transaction = db.transaction(['new_budget'], 'readwrite');
                const budgetObjectStore = transaction.objectStore('new_budget');
                budgetObjectStore.clear();
                alert('All saved budget info has been submitted!!!');
                location.reload();
            });
        
        }
    };
};

window.addEventListener('online', uploadBudget);