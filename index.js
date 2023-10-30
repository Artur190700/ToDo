const hederSize = 68;
const searchBar = 78;
const title = 70;
let maxId;
let movingTaskId;
let taskActionType, activeTaskId, activeBarId;

start();

function start() {
    window.addEventListener("resize", calculatePx);
    localStorageLoad();
    visualizeData();
    getMaxTaskID();
    calculatePx();
    const item = document.querySelector('.tools');
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);


}
function calculatePx() {
    let screenSize = window.innerHeight;
    screenSize -= hederSize;
    screenSize -= searchBar;
    screenSize -= title;
    // console.log(screenSize);
    const tasksContainers = document.getElementsByClassName("tasksContainer");
    for (const tasksContainer of tasksContainers) {
        tasksContainer.style.maxHeight = screenSize + "px";
    }

}

function visualizeData() {
    const tools = document.getElementsByClassName('tools')[0];
    tools.innerHTML = '';
    for (const bar of board.bars) {
        const barElement = createBar(bar);
        tools.appendChild(barElement);
    }
    calculatePx();
    const allBars = document.querySelectorAll('.bars');
    for (const bar of allBars) {
        bar.addEventListener('dragover', dragOver);
        bar.addEventListener('dragenter', dragEnter);
        bar.addEventListener('dragleave', dragLeave);
        bar.addEventListener('drop', () => drop(bar.id));
    }
    localStorageSave();
}
function createBar(barProps) {
    let barsDiv = document.createElement('div');
    barsDiv.classList.add('bars');
    barsDiv.id = 'bar_' + barProps.id;
    // barsDiv.appendChild('tools');
    let divStyle = document.createElement('div');
    divStyle.classList.add("barsForJs");
    barsDiv.appendChild(divStyle);
    // barsDiv.classList.add('tasksContainer');

    let divSone = document.createElement('div');
    divStyle.appendChild(divSone);
    divSone.style.display = 'flex';
    divSone.style.gap = '15px';

    let p = document.createElement('p');
    p.innerHTML = barProps.name;
    divSone.appendChild(p);

    let number = document.createElement('div');
    number.classList.add('number3');
    number.innerHTML = barProps.tasksIds.length;
    divSone.appendChild(number);
    let plusMinus = document.createElement('div');
    divStyle.appendChild(plusMinus);
    plusMinus.style.display = 'flex';
    plusMinus.style.justifyContent = 'end';
    plusMinus.style.gap = '6px';

    let plus = document.createElement('button');
    plusMinus.appendChild(plus);
    plus.classList.add('plus');
    plus.innerHTML = '+';
    plus.onclick = function () {
        addTask(barProps.id)


    }

    let minus = document.createElement('div');
    plusMinus.appendChild(minus);
    minus.classList.add('minus');
    minus.innerHTML = '...';


    let tasksContainer = document.createElement('div');
    tasksContainer.classList.add('tasksContainer');
    barsDiv.appendChild(tasksContainer);


    // console.log(myTasks);
    for (const taskId of barProps.tasksIds) {
        const taskEl = tasks.find((e) => e.id == taskId);
        tasksContainer.appendChild(createTask(taskEl));
    }

    return barsDiv;

}

function createTask(tasksProps) {

    let task = document.createElement('div');
    task.classList.add('tasks');
    task.id = 'task_' + tasksProps.id;

    let titleHeader = document.createElement('div');
    titleHeader.classList.add('titleHeader');
    task.appendChild(titleHeader);
    let fatherB = document.createElement('div');
    fatherB.classList.add('borderBottom')
    let b = document.createElement('b');
    titleHeader.appendChild(fatherB);
    fatherB.appendChild(b);
    b.innerHTML = tasksProps.title;
    b.classList.add('b');

    let minus = document.createElement('div');
    minus.classList.add('minus');
    minus.innerHTML = '...';
    fatherB.appendChild(minus);
    minus.classList.add('moreButton');
    minus.onclick = function (event) {
        more(tasksProps, event);
    }

    let titleBody = document.createElement('div');
    titleBody.classList.add('titleBody');
    titleHeader.appendChild(titleBody);
    let p = document.createElement('p');
    titleBody.appendChild(p);
    p.innerHTML = tasksProps.text;
    let container = document.createElement('div');
    container.classList.add('tagsContainer');
    titleBody.appendChild(container);
    for (const tag of tasksProps.tags) {
        let div = document.createElement('div');
        div.classList.add('viverraDiam');
        div.innerHTML = tag;

        container.appendChild(div);

    }

    let screp = document.createElement('div');
    screp.classList.add('screp');
    titleHeader.appendChild(screp);
    let imgFather = document.createElement('div');
    imgFather.style.display = "flex";
    imgFather.style.gap = '25px';
    screp.appendChild(imgFather);

    let img = document.createElement('img');
    img.src = "favicons/screp.png";
    imgFather.appendChild(img);
    // img.innerHTML = tasksProps.fileCount; 
    if (tasksProps.fileCount == 0) {
        img.classList.add('fileCount');
        imgFather.innerHTML += '';

    }
    if (tasksProps.fileCount > 0) {

        imgFather.innerHTML += tasksProps.fileCount;
    }

    let divForFileCount = document.createElement('div');
    divForFileCount.classList.add('unknown');
    divForFileCount.appendChild(img);
    screp.appendChild(divForFileCount);
    divForFileCount.innerHTML = tasksProps.date;


    let imgFlag = document.createElement('img');
    if (tasksProps.priority == "high") {
        imgFlag.src = 'favicons/flag.png';

    } else if (tasksProps.priority == "medium") {
        imgFlag.src = 'favicons/flagYellow.png';

    } else {
        imgFlag.src = 'favicons/flagGreen.png';

    }
    imgFather.appendChild(imgFlag);
    imgFlag.alt = 'flag';
    // screp.innerHTML = tasksProps.fileCount;

    let divForClock = document.createElement('div');
    divForClock.style.display = 'flex';
    divForClock.style.gap = '9px';
    divForClock.style.height = '20px';
    divForClock.style.width = '20px';
    let imgClock = document.createElement('img');
    imgClock.src = "favicons/clock.png";
    imgFather.appendChild(divForClock);
    imgClock.innerHTML = tasksProps.date;
    divForClock.appendChild(imgClock);
    task.draggable = "true"

    return task;
}
function addTask(barID) {
    const found = board.bars.find(({ id }) => id == barID);
    // console.log(found);
    // let title = prompt("Please Enter Task Title", "Title");
    // if (title != "") {
    //     let taskTags = prompt("Enter Task Tags", "Tag");
    //     if (taskTags != "") {
    //         // taskTags = [taskTags];
    //         let text = prompt("Enter Task Text", " not necessary");
    //         let filesCount = prompt("Enter Task File Count", "Number");
    //         filesCount = parseInt(filesCount);
    //         let priority = prompt("Enter Task Priority", "low , medium ,high");
    //         let date = prompt("Enter Task Date", "Month and day");
    //         let obj = {
    //             id: ++maxId,
    //             title: title,
    //             tag: [taskTags],
    //             text: text,
    //             fileCount: filesCount,
    //             priority: priority,
    //             date: date,
    //             position: 'down'
    //         }
    //         tasks.push(obj);
    //         found.tasksIds.push(obj.id);
    //         // console.log(board.bars);
    //         visualizeData();




    //     }
    // } else {
    //     alert("UUUUPPPSSSS!!!")
    // }
    // calculatePx();

    // const showButton = document.querySelector('.plus');
    const favDialog = document.getElementById('favDialog');

    if (found) {
        favDialog.showModal();
        document.getElementById('titleID').value = '';
        document.getElementById('tagID').value = '';
        document.getElementById("tetxID").value = '';
        document.getElementById("numberId").value = '';
        document.getElementById('priorityId').value = '';
        document.getElementById('dateId').value = '';
    }

    activeBarId = barID;
    taskActionType = 'new';
}

function dragstart(event) {
    movingTaskId = event.target.id;
    console.log(movingTaskId);

}
function dragend(event) {
    console.log('end');
}

function dragOver(event) {
    event.preventDefault();
    // console.log('Drag Over', event.target)
}
function dragEnter(event) {
    // console.log('Drag Enter', event.target);
    event.preventDefault();

}
function dragLeave(event) {
    // console.log('drag leave', event.target);
    event.preventDefault();


}
function drop(barId) {
    let bar_Id = barId.split('_')[1];
    bar_Id = parseInt(bar_Id);
    let task_id = movingTaskId.split('_')[1];
    task_id = parseInt(task_id);
    // console.log(bar_Id, task_id);
    let found = board.bars.find(function (barProps) {
        if (bar_Id == barProps.id) {
            return true;
        } else {
            return false;
        }
    })

    taskRemove(task_id);
    found.tasksIds.push(task_id);
    visualizeData();
    // console.log("found");
}
function taskRemove(taskID) {
    for (const barProps of board.bars) {
        barProps.tasksIds = barProps.tasksIds.filter(function (e) {
            if (e != taskID) {
                return true;
            } else {
                return false;
            }
        })
    }
    const taskDl = tasks.find(({ id }) => id == taskID);
    delete taskDl
}
function getMaxTaskID() {
    // let array = [];
    // for (let i = 0; i < tasks.length; i++) {
    //     const element = tasks[i];
    //     array.push(element.id);

    // }

    // maxId = Math.max(...array);
    maxId = Math.max(...tasks.map(task => task.id));
    console.log(maxId);
}
function more(tasksProps, event) {
    let more = event.target;
    let deletedTAsk = tasksProps.id;
    // console.log(more);
    let gg = more.parentElement.parentElement.parentElement.parentElement;
    let isFirst = gg.firstChild === more.parentElement.parentElement.parentElement;
    let isLast = gg.lastChild === more.parentElement.parentElement.parentElement;



    let div = document.createElement('div');
    more.appendChild(div);
    div.classList.add('dropdown');
    let fatherText = document.createElement('div');
    div.appendChild(fatherText);
    fatherText.classList.toggle('dropdown-content');
    let deleteButton = document.createElement('div');
    fatherText.appendChild(deleteButton);
    deleteButton.innerHTML = 'Delete';
    let up = document.createElement('div');
    let down = document.createElement('div');
    let edit = document.createElement('div');
    fatherText.appendChild(edit);
    deleteButton.classList.add('h')
    up.classList.add('h');
    down.classList.add('h');
    edit.classList.add('h');
    edit.innerHTML = 'Edit';

    if (isLast && isFirst) {
        // fatherText.appendChild(deleteButton);
    } else if (isFirst) {

        up.innerHTML = '';
        down.innerHTML = 'Down';
        fatherText.appendChild(down);
    } else if (isLast) {
        down.innerHTML = '';
        up.innerHTML = "UP";
        fatherText.appendChild(up);

    }
    else {
        up.innerHTML = "UP";
        fatherText.appendChild(up);
        down.innerHTML = 'Down';
        fatherText.appendChild(down);
    }
    deleteButton.addEventListener('click', function () {
        taskRemove(deletedTAsk);
        visualizeData();
    });
    for (let i = 0; i < board.bars.length; i++) {
        const element = board.bars[i];

        up.addEventListener('click', function (isUP) {
            isUP = true;
            getIndexAndChangeIt(element.tasksIds, tasksProps.id, isUP);
            visualizeData();
        })
        down.addEventListener('click', function (isUP) {
            isUP = false;
            getIndexAndChangeIt(element.tasksIds, tasksProps.id, isUP);
            visualizeData();

        })
    }
    let newTask = tasksProps;

    edit.addEventListener('click', function () {

        onClickEditButton(newTask);

    })


    function getIndexAndChangeIt(arr, value, isUP) {
        let index = arr.indexOf(value);

        if (index != -1) {
            let secondIndex;
            let temp1;
            if (isUP) {
                if (index == 0) {
                    return arr;
                }
                secondIndex = index - 1;
            }
            else {
                if (index == arr.length - 1) {
                    if (!isUP) {

                        return arr
                    }
                }
                secondIndex = index + 1;

            }


            temp1 = arr[index];
            arr[index] = arr[secondIndex];
            arr[secondIndex] = temp1;



            return arr;
        }
    }
}
function search_task() {

    let input = document.getElementById('search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('tasks');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            // console.log(x[i]);
            x[i].style.display = ''
        }
    }

}

function onClickEditButton(tasksProps) {
    let header = document.getElementById('DialogHeader');
    header.innerHTML = "Edit Item";
    let button = document.getElementById('confirmBtn');
    button.innerHTML = "Save"

    // let taskToEdit = tasksProps;
    // console.log(taskToEdit);
    // addTask(tasksProps.id);

    // event.preventDefault(); // We don't want to submit this fake form

    const favDialog = document.getElementById('favDialog');
    const selectEl = favDialog.querySelector('select');
    favDialog.close(selectEl.value);
    visualizeData();
    favDialog.showModal();

    let found = tasks.find(({ id }) => id == tasksProps.id);

    document.getElementById('titleID').value = found.title;
    document.getElementById('tagID').value = found.tags;
    document.getElementById("tetxID").value = found.text;
    document.getElementById("numberId").value = found.fileCount;
    document.getElementById('priorityId').value = found.priority;
    document.getElementById('dateId').value = found.date;

    activeTaskId = tasksProps.id;
    taskActionType = 'edit';
}

function confirmEditTask(taskID) {
    let taskProps = tasks.find((t) => t.id == taskID);

    if (taskProps) {

        let title = document.getElementById('titleID').value;
        let tag = document.getElementById('tagID').value;
        let text = document.getElementById("tetxID").value;
        let number = document.getElementById("numberId").value;
        let priority = document.getElementById('priorityId').value;
        let date = document.getElementById('dateId').value;
        // console.log(title, tag, text, number, priority, date);
        tag = tag != '' ? tag.split(',') : []


        taskProps.title = title;
        taskProps.tags = tag;
        taskProps.text = text;
        taskProps.fileCount = number;
        taskProps.priority = priority;
        taskProps.date = date;

        visualizeData();

    }
}
function confirmNewTask(barId) {
    const barProps = board.bars.find((b) => b.id == barId);

    let title = document.getElementById('titleID').value;
    let tag = document.getElementById('tagID').value;
    let text = document.getElementById("tetxID").value;
    let number = document.getElementById("numberId").value;
    let priority = document.getElementById('priorityId').value;
    let date = document.getElementById('dateId').value;
    // console.log(title, tag, text, number, priority, date);

    tag = tag != '' ? tag.split(',') : []
    // console.log(tag);

    let obj = {
        id: ++maxId,
        title: title,
        tags: tag,
        text: text,
        fileCount: number,
        priority: priority,
        date: date,
        position: 'down'
    }
    tasks.push(obj);
    barProps.tasksIds.push(obj.id);
    // console.log(board.bars);
    visualizeData();


}

function onClickConfirmButton(event) {

    event.preventDefault();

    const favDialog = document.getElementById('favDialog');

    favDialog.close();

    // console.log(taskActionType, activeTaskId);
    if (taskActionType == 'new') {
        confirmNewTask(activeBarId);
    } else if (taskActionType == 'edit') {
        confirmEditTask(activeTaskId)
    }
}
function localStorageSave() {
    localStorage.setItem('board', JSON.stringify(board));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function localStorageLoad() {
    let loadedBoard = localStorage.getItem('board');
    loadedBoard = JSON.parse(loadedBoard)
    if (loadedBoard) {
        let loadedTasks = localStorage.getItem('tasks');
        loadedTasks = JSON.parse(loadedTasks);
        if (loadedTasks) {
            board = loadedBoard;
            tasks = loadedTasks;
        }
    }

}
function createFile() {
    let content2 = localStorage.getItem('tasks');
    let content = localStorage.getItem('board');

    let file = new File([content2 + "$$$$" + content], "tasks.txt", { type: "text/plain:charset=UTf-8" });

    const url = window.URL.createObjectURL(file);
    let a = document.createElement('a');
    a.href = url;
    // a.style = 'display:none';
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
}
function upLoad() {
    let input = document.createElement('input');
    input.type = "file";
    input.click();
    input.accept = '.txt';
    let upLoadTasks = '';
    let upLoadboard = '';

    input.addEventListener('change', function (event) {
        event.preventDefault();

        let fr = new FileReader();
        fr.onload = function () {
            let value = fr.result;
            upLoadTasks = value.split('$$$$')[0];
            upLoadboard = value.split('$$$$')[1];
            board = JSON.parse(upLoadboard);
            tasks = JSON.parse(upLoadTasks);
            visualizeData();
            // console.log(upLoadboard)
        }
        fr.readAsText(event.target.files[0]);
    });

}