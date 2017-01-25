
function doneTask(element){
	let Id = element.id.replace("cb_","");
	let itemText = document.getElementById("taskName_" + Id );
	if (element.checked) {
		itemText.style.textDecoration = "line-through";
		element.setAttribute('checked', true);
	}
	else{
		itemText.style.textDecoration = "none";
		element.removeAttribute('checked');
	}

	stateOfUser(null, null);
};

function addNewTask(list, text) {
	totalItems++;

	let listItem = document.createElement("li");
		listItem.id = "task_"+totalItems;

	let checkBox = document.createElement("input");
	checkBox.type =  "checkbox";
	checkBox.className = "checkbox";
	checkBox.id = "cb_" + totalItems;
	checkBox.setAttribute('onclick', 'doneTask(this)');  

	let span = document.createElement("span");
	span.className = "contentTask";
	span.id = "taskName_" + totalItems;
	span.innerText = text;

	listItem.appendChild(checkBox);
	listItem.appendChild(span);
	
	// buttons for delete, edit, up, down task
	let cntrlTaskBtn = `
 			<div class = "btnTask trash"><span id = "dlTask_${totalItems}" class="glyphicon glyphicon-trash" onclick=deleteTask(this);></span></div>
			<div class = "btnTask pencil"><span id = "rnTask_${totalItems}" class="glyphicon glyphicon-pencil" onclick=renameTask(this);></span></div>
 			<div class = "btnTask up"><span id = "upTask_${totalItems}" class="glyphicon glyphicon-chevron-up" onclick=upTask(this);></span></div>
 			<div class = "btnTask down"><span id = "downTask_${totalItems}" class="glyphicon glyphicon-chevron-down" onclick=downTask(this);></span></div>`;	

 	listItem.insertAdjacentHTML('beforeEnd',cntrlTaskBtn);		
	list.appendChild(listItem);

	stateOfUser(null, totalItems);
};


function onclAddTask(element) {
	let id = element.id.replace("btn_", "");
	let inputTextTask = document.getElementById("addTask_"+id);
	let projectId = document.getElementById("td_"+id);
	let taskText = inputTextTask.value;
	if (taskText!=="" && taskText.search(/\S+/g)>=0 ){
		addNewTask(projectId, taskText);
		inputTextTask.value = "";
		inputTextTask.focus();
	};
};

function addNewProject(prjName, lastPrj){
	if(!prjName) return;
	totalprojects++;
	let html = `<div id="pr_${totalprojects}" class = "project">
 	<div class = "head_project">
 		<span class="glyphicon glyphicon-calendar"></span>
 		<div id ="prName_${totalprojects}" class="head_project_text">${prjName}</div>
 		<span id = "dlPr_${totalprojects}" onclick=deletePr(this); class="glyphicon glyphicon-trash"></span>
 		<span id = "rnPr_${totalprojects}" onclick=renamePr(this); class="glyphicon glyphicon-pencil"></span>
 	</div>
 	<div class = "input_area">
 		 <span id="choose_${totalprojects}" onclick=chooseAllTasks(this); class="glyphicon glyphicon-plus"></span> 
 		<input type="text" id="addTask_${totalprojects}" class="addTask" /> 
 		<button id="btn_${totalprojects}" class = "btnAddTask" onclick = onclAddTask(this);> Add task</button>
 	</div>
 	<ul id = "td_${totalprojects}" class = "todolist">
 		
    </ul>
 	</div>`;
 	if (lastPrj)
		lastPrj.insertAdjacentHTML('afterEnd',html);
	else 
		document.getElementById("content").insertAdjacentHTML('beforeEnd',html);

	stateOfUser(totalprojects, null);
};

function deletePr(element){
	let id = element.id.replace("dlPr_", "");
	let pr =  document.getElementById("pr_"+id);
	pr.remove(pr);

	stateOfUser(null, null);
};

function renamePr(element){
	let id = element.id.replace("rnPr_", ""),
		newPrName = prompt("Enter new name for your project"),
		prName =  document.getElementById("prName_"+id);
		
	if (newPrName!=="" && newPrName.search(/\S+/g)>=0 ){
	prName.textContent = newPrName;
	}

	stateOfUser(null, null);
};

function deleteTask(element){
	console.log(element);
	let id = element.id.replace("dlTask_", "");
	let task =  document.getElementById("task_"+id);
	task.remove(task);

	stateOfUser(null, null);
};

function renameTask(element){
	let id = element.id.replace("rnTask_", ""),
		newTaskName = prompt("Enter new name for your task"),
		taskName =  document.getElementById("taskName_"+id);
		console.log("taskName_"+id);
	if (newTaskName!=="" && newTaskName.search(/\S+/g)>=0 ){
	taskName.textContent = newTaskName;
	}

	stateOfUser(null, null);
};

function upTask(element){
	let id = element.id.replace("upTask_", ""),
		thisTask = document.getElementById("task_"+id),
		previousTask = thisTask.previousElementSibling,
		parentNode = thisTask.parentNode;
	if (previousTask) {
		parentNode.insertBefore(thisTask,previousTask);
	}	

	stateOfUser(null, null);
}

function downTask(element){
	let id = element.id.replace("downTask_", ""),
		thisTask = document.getElementById("task_"+id),
		nextTask = thisTask.nextElementSibling,
		parentNode = thisTask.parentNode;
	if (nextTask) {
		parentNode.insertBefore(nextTask,thisTask);
	}	

	stateOfUser(null, null);
}

function stateOfUser(progectId, taskId){
	let state = document.getElementById('content').innerHTML.trim();
	$.ajax({
		url: '/saveState.php',
		type: 'POST',
		cashe: false,
		data: {'state': state, 'projectId': progectId, 'taskId': taskId},
		dataType: 'html',
		success: function (data){
			
		}
	});	
};

function chooseAllTasks(element){
	let id = element.id.replace("choose_", ""),
		arr = $(`#td_${id}`).find('input.checkbox'),
		allTask = Array.from(arr),
		existCheck = allTask.every(e => e.checked === true),
		sign = element.className.includes('plus');

	if(!existCheck && sign) {
		allTask.forEach( e => {
			if(e.checked !== true){
				e.checked = true;
				doneTask(e);
				element.className = element.className.replace('plus', 'minus');
			}
		}
	)}		
	else{
		allTask.forEach( e => {
			e.checked = false;
			doneTask(e);
			element.className = element.className.replace('minus', 'plus');
		});				
	};		
};


let totalprojects = +document.getElementById("lastPrId").innerHTML,
	totalItems = +document.getElementById("lastTaskId").innerHTML;

console.log(totalItems, totalprojects);

let btnAddPjct = document.getElementById("btnPr");
btnAddPjct.onclick = function(){
	let prjName = prompt("Enter your project name"),
		arrOfPrj = document.getElementsByClassName("project"),
		lastPrj;
	lastPrj = arrOfPrj ? arrOfPrj[arrOfPrj.length-1]: null;
	addNewProject(prjName, lastPrj);
}