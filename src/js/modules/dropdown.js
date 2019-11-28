let defaultStrLabel = "Сколько гостей";

//маскси id-шников
let _idItemValue = "#item_" + "*#*" + "_count";
let _idItemChangeDec = "#item_" + "*#*" + "_dec";
let _idItemValueForReplace = "#item_" + "*#*" + "_count";

//Id-шники
let idDropdown = "#dropdown";

//классы
let classDropdown = ".dropdown";
let classItemValue = ".dropdown__item__value";
let classClearButton = ".dropdown__clear";
let classApplyButton = ".dropdown__apply";
let classChangeButton = ".dropdown__item__change";
let classLabel = ".dropdown__label";
let classMenu = ".dropdown__menu";

$(document).ready(function() {
  countGuests();

  //Клик по полю дропдауна
  $(classLabel).click(function() {
    let menu = $(this)
      .parent()
      .find(classMenu);

    if (menu.css("display") == "none") {
      showMenu(menu);
    } else {
      hideMenu(menu);
    }
  });

  //Клик по change
  $(classChangeButton).click(function() {
    let id = $(this)
      .attr("id")
      .split("_")[1];
    let idItemValue = $(this)
      .parent()
      .find(_idItemValue.replace("*#*", id));
    let idItemChangeDec = _idItemChangeDec.replace("*#*", id);
    let currentValue = $(idItemValue).text() * 1;

    //Выполняем декремент или инкремент
    if ($(this).text() == "-" && currentValue != 0) {
      currentValue--;
      $(idItemValue).text(currentValue);
    } else if ($(this).text() == "+") {
      currentValue++;
      $(idItemValue).text(currentValue);
      $(classClearButton).show(300);
    }

    //Делаем прозрачной кнопку декремента, если значение==0
    if (currentValue == 0) {
      $(idItemChangeDec).css("opacity", "0.55");
    } else {
      $(idItemChangeDec).css("opacity", "1.0");
    }

    //Прячем кнопку очистки, если все значения ==0
    let allValuesIsNull = "";
    for (let i = 0; i < 3; i++) {
      allValuesIsNull += $(_idItemValueForReplace.replace("*#*", i)).text() * 1;
    }
    if (allValuesIsNull == 0) {
      $(classClearButton).hide(200);
    }

    countGuests();
  });

  //Клик по Применить
  $(classApplyButton).click(() => {
    hideMenu();
  });

  //Клик по Очистить
  $(classClearButton).click(function() {
    let idItemValue = "";
    let idItemChangeDec = "";
    for (let i = 0; i < 3; i++) {
      idItemValue = _idItemValue.replace("*#*", i);
      idItemChangeDec = _idItemChangeDec.replace("*#*", i);
      $(idItemValue).text("0");
      $(idItemChangeDec).css("opacity", "0.55");
    }
    $(this).hide(200);

    countGuests();
  });
});

//Обновить состояние главного label дропдауна
let countGuests = () => {
  //перебираем все дропдауны
  $(classDropdown).each(function() {
    let res = 0;
    let currentDropdown = $(this);
    $(this)
      .find(classItemValue)
      .each(function() {
        res += $(this).text() * 1;
      });
    //console.log(res);
    if (res != 0) setTextToLabel(currentDropdown, getTextForLabel(res));
    else setTextToLabel(defaultStrLabel);
  });
};

//Задать текст в лейбл
function setTextToLabel(currentDropdown, text) {
  currentDropdown.find(classLabel).text(text);
}

//Показать меню
function showMenu(menu) {
  menu.show(150);
}

//Скрыть меню
function hideMenu(menu) {
  menu.hide(150);
}

// $("body")
//   .not(".dropdown")
//   .click(function() {
//     console.log($(this));
//     $(classMenu).hide(150);
//   });

//Возвращаем строку со словом "гость" в корректном склонении
function getTextForLabel(n) {
  let res = "";
  let declensionWord = ["гостя", "гость", "гостей"];
  let count = n;
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n1 > 1 && n1 < 5 && !(count > 10 && count < 20)) {
    res = declensionWord[0];
  }
  if (n1 == 1 && !(count > 10 && count < 20)) {
    res = declensionWord[1];
  }
  if (res == "") {
    res = declensionWord[2];
  }

  return count + " " + res;
}