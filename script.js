//Define UI Element 

let form = document.getElementById('task_form');
let taskList = document.getElementById('tasks');
let clearBtn = document.querySelector('#clear_task_btn');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');

//Define Event Listeners
form.addEventListener('submit', addTaskInput);
taskList.addEventListener('click',removeTaskInput);
clearBtn.addEventListener('click',clearTaskInput);

filter.addEventListener('keyup',filterTaskInput);

document.addEventListener('DOMContentLoaded',getTask);


function addTaskInput(e){
    if(taskInput.value === ''){
        alert('Add Task Input');
    }else{
        //Create li Element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value+ " "));
        taskList.appendChild(li);

        //Add cross remove tasks
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.innerHTML = "X" ;
        cross.style.color = 'red';
        cross.style.textDecoration = 'none';
        cross.style.fontWeight = 'bold';
        
        li.appendChild(cross);
        storeTaskInLocalStorage(taskInput.value); 

        //Clear Input Task Word
        taskInput.value = '';
    }
    e.preventDefault();
}

//Remove Task 
function removeTaskInput(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are You Sure?")){
            let rem = e.target.parentElement ;
            rem.remove();

            removeFromLocalStorage(rem);
        }
    }
    
}

//Clear All Task 

function clearTaskInput(e){
    taskList.innerHTML = "";


    localStorage.clear();

}

//Filter Task 

function filterTaskInput(e){

    let text = e.target.value.toLowerCase() ;

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent ;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

//Store In Local Storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task+ " "));
        taskList.appendChild(li);

        //Add cross remove tasks
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.innerHTML = 'X' ;
        cross.style.color = 'red';
        cross.style.textDecoration = 'none';
        cross.style.fontWeight = 'bold';
        li.appendChild(cross);

    });
}


function removeFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }


    let li = taskItem;
    li.removeChild(li.lastChild); // <a>x</a>

    tasks.forEach((task,index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));



}