
let chekcboxes;
const items = document.querySelectorAll('.item');
const todoContainer = document.getElementById('todoContainer');
const inputTodo = document.getElementById('inputTodo');

let lastChecked;
let listItems = [];
const toDoItems = ['a', 'b', 'c']
createList();
addEventListeners();


function createList () {
  todoContainer.innerHTML = '';
  toDoItems.forEach((item, index)=> {
    const listItem = document.createElement('div');
    listItem.className = 'item';
    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <div draggable="true" class="draggable">
      <input type="checkbox" draggable="true">
      <p class="text">${item}</p>
    </div>
    `;
    listItems.push(listItem)
    todoContainer.appendChild(listItem); // 將每一個list item append 至 todo container
  })
}

function addItem (event) {
  // console.log(event.keyCode);
  const value = inputTodo.value;
  console.log(value);
  toDoItems.push(value);
  createList();
}

function handleCheck (event) {
  let inBetween = false;
  if (event.shiftKey && this.checked) {
    // shift key 被按下且被勾選
    chekcboxes.forEach((checkbox)=> {
      if (checkbox === this || checkbox === lastChecked) {
        // 當前被按下的那項或是最後被按下的那項
        inBetween = !inBetween; // 標記為區間
        console.log('starting to check them in between');
      }
      if (inBetween) {
        // 是區間就打勾
        checkbox.checked = true;
      }
    })
  }
  lastChecked = this; // 最後勾選
}

let dragStartIndex;
function dragStart (event) {
  console.log('開始拖曳')
  console.log(event.target)
  dragStartIndex = +this.closest('.item').getAttribute('data-index');
  console.log(dragStartIndex);
}

function dragOver (event) {
// 持續拖曳且在某個元素上方
event.preventDefault();
console.log('持續拖曳')
}

function dragDrop (event) {
  console.log('放到有效位置且放開滑鼠')
  const dragEndIndex = +this.getAttribute('data-index');
  swapItem(dragStartIndex, dragEndIndex);
  this.classList.remove('over')
}

function swapItem (fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
} 

function dragEnter () {
  // 增加效果
  console.log('進入有效位置')
  this.classList.add('over');
    // 放置有效位置
}

function dragLeave () {
  // 移除效果
  console.log('離開一個有效目標')
  this.classList.remove('over');
}

function addEventListeners() {
  chekcboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
  chekcboxes.forEach((checkbox)=> checkbox.addEventListener('click', handleCheck));
  console.log('chekcboxes', chekcboxes);
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.item');

  draggables.forEach(draggable => {
    // source
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    // container
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}