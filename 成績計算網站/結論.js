// let slider = document.querySelector(".slider");
// let hero = document.querySelector(".hero");
// let animation = document.querySelector(".animation-wrapper");

// const timeLine = new TimelineMax(); //TimelineMax() 是GSAP 定義好的函式，透過 <script> tag 連接到外部的JS
// // 用 new operator 創建一個新的實例

// timeLine
//   .fromTo(
//     //fromTo() 是 Timeline屬性
//     hero, // 第一個參數：對象
//     1, // 第二個參數是 duration
//     { height: "0" }, // 第三個參數是 對象的原始狀態(from)，value 用 string 寫
//     { height: "100%", ease: Power2.easeInOut } // 第三個參數是動畫結束時，對象的狀態，以及速度曲線
//   )
//   .fromTo(
//     hero,
//     1.2,
//     { width: "80%" },
//     { width: "100%", ease: Power2.easeInOut }
//   )
//   .fromTo(
//     slider,
//     1,
//     { x: "-100%" },
//     { x: "0%", ease: Power2.easeInOut },
//     "-=1.2" //動畫提早進場時間，也是string type
//   )
//   .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// //以下設定經過多少時間，執行一次函式 setTimeout( callbackFn, time)
// setTimeout(() => {
//   animation.style.pointerEvents = "none";//滑鼠不能再點到animation wrapper
// }, 2500);

//讓Enter 鍵失效
addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 讓 button 鍵失效
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) =>
  button.addEventListener("click", (e) => e.preventDefault())
);
//改變credits 即讓GPA 重新計算
let allCredits = document.querySelectorAll(".class-credits");
allCredits.forEach((credit) =>
  credit.addEventListener("change", () => {
    setGPA();
  })
);
//讓select 顏色改變

let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) =>
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); // e.target 就會等於 select，如果不用產生出的 element objects，用select 也可以
  })
);
//選取網頁上所有<select> 標籤，每個 <select> 掛上事件監聽器。
//如果其中一個 <select> 遇到 "change" 事件，則該 <select> 的element objects 中的 target 被作為參數放入changeColor()中
//target.value 代表的是該 <select> 被選取的 「值」
//changeColor()這個函式則依據選取到布一樣的值，給予<select>不同的背景顏色與字體顏色。
function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "#000";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "#000";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "#000";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "#fff";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "#fff";
  } else {
    target.style.backgroundColor = "#eee";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}
//<select> 的<option>被更改，則重新計算 GPA，以下為函數
function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credits");
  let selects = document.querySelectorAll("select");
  //------
  //credits[i] 是credits 標籤本身代表的很多物件，其中有valueAsNumber 的屬性，其data type = number。
  // 但如果credits[i] 沒有 key in 任何數字，則其valueAsNumber 會是 NaN。
  //NaN 做計算仍是 NaN，故「非NaN」的credits[i].valueAsNumber 才做計算

  let sum = 0; //學分*成績
  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }
  //----
  let creditSum = 0; // 學分總和
  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }

  document.querySelector("#result-gpa").innerText = result;
}

let plusButton = document.querySelector(".plus-btn");
plusButton.addEventListener("click", () => {
  let newForm = document.createElement("form");

  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credits");
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "select");
  newSelect.classList.add("select");
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  //newSelect 的 option 選項做出來 ↓
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2); //appendChild(text not String)
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);
  // select 的選項做完後，將select 包裹住所有opt
  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  let newTrashButton = document.createElement("button");
  newTrashButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas", "fa-trash"); //multiple classes added
  newTrashButton.appendChild(newItag); // trash button 製作完畢

  newTrashButton.addEventListener("click", (e) => {
    e.preventDefault(); //trash button 被點擊時，先取消 Enter 的默認行為，再執行 scaleDown 動畫
    newTrashButton.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    //動畫執行後 form 被移除
    newTrashButton.parentElement.addEventListener("animationend", () => {
      newTrashButton.parentElement.remove();
      //form 被移除後，setGPA()
      setGPA();
    });
  });

  newForm.appendChild(newInput1);
  newForm.appendChild(newInput2);
  newForm.appendChild(newInput3);
  newForm.appendChild(newSelect);
  newForm.appendChild(newTrashButton);
  newForm.style.animation = "scaleUp 0.5s ease forwards "; // forwards 代表播放結束時，元素畫面會停留在最後一個樣子

  document.querySelector(".all-inputs").appendChild(newForm);
});

let trashBtn = document.querySelectorAll(".trash-button");
trashBtn.forEach((trash) => {
  trash.addEventListener("click", () => {
    trash.parentElement.classList.add("remove");
    let removedForm = document.querySelector(".remove");
    removedForm.addEventListener("transitionend", () => {
      removedForm.remove();
      setGPA();
    });
  });
});

// JS 讀取速度很快，在CSS 動畫跑完前就會執行完畢之後的程式碼，所以需要用transitionend 或 animationend 的 events
//新的trash btn 會有刪除<form> 的功能嗎？ 不會，因為前面使用DOM 的選取功能為 querySelector，return 的 NodeList 是靜態的

let ascendingBtn = document.querySelector(".sort-ascending");
let descendingBtn = document.querySelector(".sort-descending");

ascendingBtn.addEventListener("click", () => {
  handleSort("ascending");
});

descendingBtn.addEventListener("click", () => {
  handleSort("descending");
});

function handleSort(direction) {
  let allForms = document.querySelectorAll("form");
  let object_arr = [];

  for (let i = 0; i < allForms.length; i++) {
    let class_category = allForms[i].children[0].value;
    let class_number = allForms[i].children[1].value;
    let class_credit = allForms[i].children[2].value;
    let class_grader = allForms[i].children[3].value;
    let class_grader_number = convertor(class_grader);
    if (
      !(
        class_category == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grader == ""
      )
    ) {
      let form_object = {
        class_category,
        class_number,
        class_credit,
        class_grader,
        class_grader_number,
      };
      object_arr.push(form_object);
    }
  }

  object_arr = mergeSort(object_arr);
  if (direction == "descending") {
    object_arr = object_arr.reverse();
  }
  console.log(object_arr);
  //以上製作一個object arr，儲存有輸入data 的form 物件，之後再做mergeSort 用以排序
  // 以下寫出將 input 清空再填入的程式碼
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = ""; // 清空div. all-inputs，再將object_arr 一項項排入，運用 backtick 將新的 form 內容放入

  for (let i = 0; i < object_arr.length; i++) {
    allInputs.innerHTML += `<form>
  <input
    type="text"
    placeholder="class category"
    class="class-type"
    list="opt"
    value=${object_arr[i].class_category}
  /><input
    type="text"
    placeholder="class number"
    class="class-number"
    value=${object_arr[i].class_number}
  /><input
    type="number"
    placeholder="credits"
    min="0"
    max="6"
    class="class-credits"
    value=${object_arr[i].class_credit}
  /><select name="select" class="select" required>
    <option value=""></option>
    <option value="A">A</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B">B</option>
    <option value="B-">B-</option>
    <option value="C+">C+</option>
    <option value="C">C</option>
    <option value="C-">C-</option>
    <option value="D+">D+</option>
    <option value="D">D</option>
    <option value="D-">D-</option>
    <option value="F">F</option></select
  ><button class="trash-button">
    <i class="fas fa-trash"></i>
  </button>
</form>`;
  }

  // 因為select 的值不能直接做出來，要另外用 JS 控制select 的值保持 object_arr 內的植
  // 因HTML text 已經重新寫過，所以要再重新選取（因原本的 form 已被更新，但 NodeList 是靜態，沒辦法跟著被更新）
  allForms = document.querySelectorAll("form");
  for (let i = 0; i < allForms.length; i++) {
    allForms[i].children[3].value = object_arr[i].class_grader;
  }

  //把新增的 HTML text 掛上該有的事件監聽器及函式

  let allCredits = document.querySelectorAll(".class-credits");
  allCredits.forEach((credit) =>
    credit.addEventListener("change", () => {
      setGPA();
    })
  );

  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  let trashBtn = document.querySelectorAll(".trash-button");
  trashBtn.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      trash.parentElement.classList.add("remove");
      let removedForm = document.querySelector(".remove");
      removedForm.addEventListener("transitionend", () => {
        removedForm.remove();
        setGPA();
      });
    });
  });
}

//a1、a2 的class_grader_number 會從index = 0 開始比較，較小的數字先push 進result 的array 中，push 到沒有後，另一個a1 或 a2剩餘的數字再放入result 內
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < a1.length && j < a2.length) {
    //誰小誰先進result
    if (a1[i].class_grader_number < a2[j].class_grader_number) {
      result.push(a1[i]);
      i++;
    } else {
      result.push(a2[j]);
      j++;
    }
  }
  //一旦 i 或 j 超過原arr 的長度，則上一個while loop 跳出執行以下：
  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

//建立一個有遞迴關係的函式，用於將欲比較大小的 object 放入切割，再透過merge() 一一比較
function mergeSort(array) {
  if (array.length == 0) {
    return; // array 長度為0 則不需要跑mergeSort
  }
  if (array.length == 1) {
    return array; // array 長度為1，表示 [] 中只有一個數字，可以直接跟其他 [] 做merge 比較
  } else {
    //其他長度的arr 則不斷除以2，兩兩比較再透過 merge 重組成一個result
    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle); // 從index = 0 開始，一直到 index = middle -1
    let right = array.slice(middle, array.length); // 從 index = middle開始，一直到長度減一(最後一個index)
    return merge(mergeSort(left), mergeSort(right)); //mergeSort 切割array，透過merge 比大小，再慢慢透過merge 組建起 object array
  }
}
