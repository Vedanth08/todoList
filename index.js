var inputElement = document.getElementById('inputElement');

var addButton = document.getElementById('addButton');

var todoListelementContainer = document.getElementById('taskList');

var savetaskElement = document.getElementById('saveButton');

var listarray = [];



function addTask() {

    let userInputvalue = inputElement.value;

    if (userInputvalue === "") {

        alert(" You have Provided a empty input value ");

        return;

    }

    inputElement.value = "";  // it clears the user input after providing it 


    // ..... (  Created the list item ) ............................

    let listItems = document.createElement('li');

    listItems.classList.add('listItems');

    todoListelementContainer.appendChild(listItems);


    // ..... (  Created the checkbox input ) ............................

    let checkboxElement = document.createElement('input');

    checkboxElement.type = "checkbox"

    checkboxElement.classList.add('checkbox-input');

    listItems.appendChild(checkboxElement);


    // ..... (  Created the label element ) ............................

    let labelElement = document.createElement('label');

    labelElement.textContent = userInputvalue;

    labelElement.classList.add("labelElement");

    listItems.appendChild(labelElement);


    // ..... (  Created the Button element ) ............................

    let removeTaskbutton = document.createElement('button');

    removeTaskbutton.classList.add('bi', 'bi-trash', 'removeButton', 'position-absolute', 'end-0', 'translate-middle', 'align-center');
    
    listItems.appendChild(removeTaskbutton);


    // ..... (  Update the ID of the listItems ) ............................

    listItems.id = "listItems" + listarray.length;

    let newId = listarray.length;

    let todoList = { 
        username: userInputvalue, 
        ID: newId,
        ischecked : false
    };

    listarray.push(todoList);
    

    // ..... (  Implementing check box check label strike operation ) ............................

    removeTaskbutton.onclick = function () {

        todoListelementContainer.removeChild(listItems);
    }

    // ..... (  Implementing check box check label strike operation ) ............................

    checkboxElement.onclick = function () {

        labelElement.classList.toggle('checked');

    }

    // Creating the ID's for all the elements

    labelElement.id = labelElement+newId;
    
    checkboxElement.id = checkboxElement + newId;

    return listarray;

}


// ..... ( Calling the function when click operation has taken place ) ............................

addButton.onclick = function () {

    addTask();

};


// ..... ( storing the task list into the local storage  ) ............................

savetaskElement.onclick = function () {

    const stringifyResult = JSON.stringify(listarray);

    localStorage.setItem("todoList", stringifyResult);

};


// ..... ( retriving and displaying the task list on reload too ) ............................

function loadTasks() {

    const storedTasks = localStorage.getItem("todoList");

    if (storedTasks) {

        listarray = JSON.parse(storedTasks);

        listarray.forEach(function (task) {

            addTaskToList(task.username, task.ischecked);

        });
    }
}


// Local Storage Implementation operation ********************************

// ..... ( Helper function to add a task to the list after storing the list into the local storage and displaying after the reload too ) ............................

function addTaskToList(username, ischecked) {


    // ..... (  Created the list item ) ............................

    let listItems = document.createElement('li');

    listItems.classList.add('listItems');

    todoListelementContainer.appendChild(listItems);


    // ..... (  Created the checkbox input ) ............................

    let checkboxElement = document.createElement('input');

    checkboxElement.type = "checkbox"

    checkboxElement.classList.add('checkbox-input');

    checkboxElement.checked = ischecked;

    listItems.appendChild(checkboxElement);


    // ..... (  Created the label element ) ............................

    let labelElement = document.createElement('label');

    labelElement.textContent = username;

    labelElement.classList.add("labelElement");

    listItems.appendChild(labelElement);


    // ..... (  Creating the Button Element  ) ............................

    let removeTaskbutton = document.createElement('button');

    removeTaskbutton.classList.add('bi', 'bi-trash', 'removeButton', 'position-absolute', 'end-0', 'translate-middle', 'align-center');
    
    listItems.appendChild(removeTaskbutton);


    // ...... ( Removing the element by clicking on a button ) ...................................

    removeTaskbutton.onclick = function () {

        todoListelementContainer.removeChild(listItems);

        removeTaskFromLocalStorage(username); 

    };


    // ..... (  Implementing check box check label strike operation ) ............................


    checkboxElement.onclick = function () {

        labelElement.classList.toggle('checked');

        ischecked = checkboxElement.checked;

        updateTaskInListArray(username, ischecked);

        const stringifyResult = JSON.stringify(listarray);

        localStorage.setItem("todoList", stringifyResult);


    }

}


// ..... ( removing the stored value in the local storage and upadting the local storage after the deletion ) ............................

function removeTaskFromLocalStorage(username) {

    listarray = listarray.filter(task => task.username !== username);

    const stringifyResult = JSON.stringify(listarray);

    localStorage.setItem("todoList", stringifyResult);
    
}


// function to update the 'ischecked' property in the listarray

function updateTaskInListArray(username, ischecked) {

    for (let i = 0; i < listarray.length; i++) {

        if (listarray[i].username === username) {

            listarray[i].ischecked = ischecked;

            break;
        }
    }
}


loadTasks();

