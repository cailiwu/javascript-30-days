/*
 1. 按住shift key 選擇
 2. Add new option
 3. drag api
*/

// 列出所有的checkbox
const chekcboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
console.log(chekcboxes);
let lastChecked;

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

chekcboxes.forEach((checkbox)=> checkbox.addEventListener('click', handleCheck))