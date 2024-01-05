let slider = document.querySelector(".slider");
let hero = document.querySelector(".hero");
let animation = document.querySelector(".animation-wrapper");

const time_line = new TimelineMax();

//parameter: object, duration, start-situation, end-situation+timing function, 提早多久
time_line
  .fromTo(hero, 1, { height: "0" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" });

//將anumation 消失 setTimeout(Fn, ms)

setTimeout(() => {
  animation.style.pointerEvents = "none"; //點不到animation的部分，所以點得到後方的畫面
}, 2500);

//讓 Enter 鍵失效
window.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//讓按鍵失效
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) =>
  button.addEventListener("click", (e) => e.preventDefault())
);

//讓select 在選擇後改變顏色
let allselects = document.querySelectorAll("select");
allselects.forEach((select) => {
  select.addEventListener("change", () => {
    changeColor(select);
    setGPA();
  });
});

//讓 cedits 改變後重新計算GPA
let allCredits = document.querySelectorAll(".class-credits");
allCredits.forEach((credit) =>
  credit.addEventListener("change", () => {
    setGPA();
  })
);
function changeColor(select) {
  if (select.value == "A" || select.value == "A-") {
    select.style.backgroundColor = "lightgreen";
  } else if (
    select.value == "B+" ||
    select.value == "B" ||
    select.value == "B-"
  ) {
    select.style.backgroundColor = "yellow";
  } else if (
    select.value == "C+" ||
    select.value == "C" ||
    select.value == "C-"
  ) {
    select.style.backgroundColor = "orange";
  } else if (
    select.value == "D+" ||
    select.value == "D" ||
    select.value == "D-"
  ) {
    select.style.backgroundColor = "red";
  } else if (select.value == "F") {
    select.style.backgroundColor = "gray";
    select.style.color = "white";
  } else {
    select.style.backgroundColor = "#eee";
  }
}

function setGPA() {
  //公式：成績 * 學分 / 學分總和 = result
  let credits = document.querySelectorAll(".class-credits");
  let graders = document.querySelectorAll(".select");

  let sumCredits = 0;
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sumCredits += credits[i].valueAsNumber;
    }
  }

  let sumGraders = 0;
  for (let i = 0; i < graders.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sumGraders += credits[i].valueAsNumber * convertor(graders[i].value);
    }
  }

  let result;
  //不讓NaN 有機會出現!!
  if (sumCredits == 0) {
    result = (0).toFixed(2);
  } else {
    result = (sumGraders / sumCredits).toFixed(2);
  }

  let gpa = document.querySelector("#result-gpa");
  gpa.innerText = result;
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

// 垃圾桶按鈕及功能：按下後，整個 form 被移除，且 GPA重算，最後加上動畫，減緩速度

let trashBtns = document.querySelectorAll(".trash-button");
trashBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    btn.parentElement.classList.add("removal");
    let removedForm = document.querySelector(".removal");
    removedForm.style.animation = "scaleDown 0.5s ease ";
    removedForm.addEventListener("animationend", () => {
      removedForm.remove();
      setGPA();
    });
  })
);

// 新增按鈕

let plusBtn = document.querySelector(".plus-btn");
plusBtn.addEventListener("click", () => {
  addNewForm();
});

function addNewForm() {
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credits");
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "select");
  newSelect.classList.add("select");
  newSelect.addEventListener("change", () => {
    changeColor(newSelect);
    setGPA();
  });
  //這邊製作很多的 option 放在選單裡面
  let opt1,
    opt2,
    opt3,
    opt4,
    opt5,
    opt6,
    opt7,
    opt8,
    opt9,
    opt10,
    opt11,
    opt12,
    opt13;

  let options = [
    opt1,
    opt2,
    opt3,
    opt4,
    opt5,
    opt6,
    opt7,
    opt8,
    opt9,
    opt10,
    opt11,
    opt12,
    opt13,
  ];
  let optionValue = [
    "",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F",
  ];

  for (let i = 0; i < options.length; i++) {
    options[i] = document.createElement("option");
    options[i].setAttribute("value", optionValue[i]);
    options[i].appendChild(document.createTextNode(optionValue[i]));
    newSelect.appendChild(options[i]);
  }

  let newTrashBtn = document.createElement("button");
  newTrashBtn.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas", "fa-trash");
  newTrashBtn.appendChild(newItag);
  newTrashBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newTrashBtn.parentElement.style.animation = "scaleDown 0.5s ease forwards";
    newTrashBtn.parentElement.addEventListener("animationend", () => {
      newTrashBtn.parentElement.remove();
      setGPA();
    });
  });

  let newForm = document.createElement("form");
  newForm.appendChild(newInput1);
  newForm.appendChild(newInput2);
  newForm.appendChild(newInput3);
  newForm.appendChild(newSelect);
  newForm.appendChild(newTrashBtn);
  newForm.style.animation = "scaleUp 0.5s ease forwards";

  document.querySelector(".all-inputs").appendChild(newForm);
}

//升降序!!!!
let ascendingBtn = document.querySelector(".sort-ascending");
let descendingBtn = document.querySelector(".sort-descending");
ascendingBtn.addEventListener("click", () => {
  handleSort("ascending"); //由小排到大
});
descendingBtn.addEventListener("click", () => {
  handleSort("descending"); //由大排到小
});

//依照成績大小排序的function
function handleSort(direction) {
  let objectArr = [];
  let allForms = document.querySelectorAll("form");
  for (let i = 0; i < allForms.length; i++) {
    let class_category = allForms[i].children[0].value;
    let class_number = allForms[i].children[1].value;
    let class_credits = allForms[i].children[2].value;
    let class_grader = allForms[i].children[3].value;
    let class_grader_number = convertor(allForms[i].children[3].value);
    //設定多個 object，用於儲存帶有資料的 form，之後再 push 到 objectArr裡面
    if (
      !(
        class_category == "" &&
        class_number == "" &&
        class_credits == "" &&
        class_grader == ""
      )
    ) {
      let object = {
        class_category,
        class_number,
        class_credits,
        class_grader,
        class_grader_number,
      };

      objectArr.push(object); //取得含有數據的 objectArr
    }
  }
  objectArr = mergeSort(objectArr); //取得被排序好的 objectArr
  if (direction == "descending") {
    objectArr = objectArr.reverse();
  }

  //製作完排序的objectArr function後，清空 all-inputs內的內容，再新增新的表單+ 排序好的各項的值
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArr.length; i++) {
    allInputs.innerHTML += `<form>
  <input
    type="text"
    placeholder="class category"
    class="class-type"
    list="opt"
    value = ${objectArr[i].class_category}
  /><input
    type="text"
    placeholder="class number"
    class="class-number"
    value = ${objectArr[i].class_number}
  /><input
    type="number"
    placeholder="credits"
    min="0"
    max="6"
    class="class-credits"
    value = ${objectArr[i].class_credits}
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

  //select 的 value 做不出來，所以要另外建立（select標籤包裹著 option 標籤，故建立的value 是屬於option 的，要寫到select的 value 要從表單本身寫）
  let newForms = document.querySelectorAll("form");
  for (let i = 0; i < objectArr.length; i++) {
    newForms[i].children[3].value = objectArr[i].class_grader;
  }
  setGPA();
  //新的form 顯示在視窗上後，要再將內部HTML 掛上功能

  let newCredits = document.querySelectorAll(".class-credits");
  newCredits.forEach((credit) =>
    credit.addEventListener("change", () => {
      setGPA();
    })
  );

  let newSelect = document.querySelectorAll("select");
  newSelect.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", () => {
      changeColor(select);
      setGPA();
    });
  });

  let newTrashBtn = document.querySelectorAll(".trash-button");
  newTrashBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.parentElement.style.animation = "scaleDown 0.5s ease forwards";
      btn.parentElement.addEventListener("animationend", () => {
        btn.parentElement.remove();
        setGPA();
      });
    });
  });
}

//merge 是用來比大小，a1、a2 都是 object array
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grader_number < a2[j].class_grader_number) {
      result.push(a1[i]);
      i++;
    } else {
      result.push(a2[j]);
      j++;
    }
  }
  // 如果 i 或 j 大於原本array 的長度，則跳到下面的 while loop: 剩餘的 array.index 直接放入 result 中
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

// mergeSort 是用來將長度大於1 的 array 分割成1 個個 array
function mergeSort(array) {
  if (array.length == 0) {
    return;
  }
  if (array.length == 1) {
    return array;
  } else {
    //找出將array 對半分開的中間值及左右值
    let middleIndex = Math.floor(array.length / 2);
    let left = array.slice(0, middleIndex);
    let right = array.slice(middleIndex, array.length);

    return merge(mergeSort(left), mergeSort(right));
  }
}
