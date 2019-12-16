//Classes
let dropdownClass = ".dropdown";
//--Types dropdown
let dropdownTypeAttr = "type";
let dropdownGuestType = "guests";
let dropdownRoomAmenitiesType = "roomAmenities";
//--Label
let labelClass = ".dropdown__label";
let labelTextClass = ".dropdown__label__text";
let labelArrowClass = ".dropdown__label__arrow";
let labelArrowReflectedClass = ".dropdown__label__arrow_reflected";
//--Menu
let menuClass = ".dropdown__menu";
let itemMenuClass = ".dropdown__item";
let itemLabelMenuClass = "dropdown__item__label";
let changeButtonClass = ".dropdown__item__change";
let changeButtonDisabledClass = "dropdown__item__change_disabled";
let valueClass = ".dropdown__item__value";
let applyButtonClass = ".dropdown__btn_apply";
let clearButtonClass = ".dropdown__btn_clear";

//Params
let timeoutAnimation = 160;

jQuery(document).ready(function(e) {
  $(dropdownClass).each(function() {
    updateLabel(this);
  });

  //#region 'Show and Hide menu'

  //Click on Label
  $(labelClass).click(function() {
    let currentMenu = $(this)
      .parent()
      .find(menuClass);

    let currentDropdown = $(this).closest(dropdownClass);

    updateDecStyle(currentMenu);

    //Close all opened menues
    $(menuClass + ":visible").each(function() {
      if (!$(this).is($(currentMenu))) {
        hideMenu($(this).closest(dropdownClass));
      }
    });

    if (currentMenu.css("display") == "none") {
      showMenu(currentDropdown);
    } else {
      hideMenu(currentDropdown);
    }
  });

  //Click outside Dropdown
  $(document).click(function(e) {
    if (
      !$(dropdownClass).is(e.target) &&
      $(dropdownClass).has(e.target).length == 0
    ) {
      hideAllMenues();
    }
  });

  function showMenu(dropdown) {
    reflectArrow(dropdown);
    $(dropdown)
      .find(menuClass)
      .show(timeoutAnimation);
  }

  function hideMenu(dropdown) {
    reflectArrow(dropdown);
    $(dropdown)
      .find(menuClass)
      .hide(timeoutAnimation);
  }

  function reflectArrow(dropdown) {
    console.log("REF");
    let currentDropdownArrow = $(labelArrowClass, dropdown);
    $(currentDropdownArrow).toggleClass(labelArrowReflectedClass.slice(1));
  }

  function hideAllMenues() {
    console.log("hide all");
    $(menuClass + ":visible").each(function() {
      hideMenu($(this).closest(dropdownClass));
    });
  }

  //#endregion

  //Click on change
  $(changeButtonClass).click(function() {
    let currentValue =
      $(this)
        .parent()
        .find(valueClass)
        .text() * 1;
    let newValue = 0;
    let currentDropdownMenu = $(this).closest(menuClass);
    let currentDropown = $(this).closest(dropdownClass);

    if ($(this).text() == "+") {
      newValue = currentValue + 1;
    } else if ($(this).text() == "-" && currentValue != 0) {
      newValue = currentValue - 1;
    }

    $(this)
      .parent()
      .find(valueClass)
      .text(newValue);

    updateDecStyle(currentDropdownMenu);
    updateLabel(currentDropown);
  });

  //Click on apply
  $(applyButtonClass).click(function() {
    let currentDropDown = $(this).closest(dropdownClass);
    hideMenu(currentDropDown);
  });

  //Click on Clear
  $(clearButtonClass).click(function() {
    let menu = $(this).closest(menuClass);
    let currentDropown = $(this).closest(dropdownClass);

    $(valueClass, menu).each(function() {
      $(this).text("0");
    });

    updateLabel(currentDropown);
    updateDecStyle(menu);
    hideClearButton(this);
  });
});

function showClearButton(clearButton) {
  $(clearButton).show(timeoutAnimation);
}

function hideClearButton(clearButton) {
  $(clearButton).hide(timeoutAnimation);
}

function updateLabel(dropdown) {
  let currentDropDown = dropdown;
  let currentDropdowType = $(currentDropDown).attr(dropdownTypeAttr);

  switch (currentDropdowType) {
    case dropdownGuestType: {
      let res = 0;
      $(valueClass, currentDropDown).each(function() {
        res += $(this).text() * 1;
      });
      switch (res) {
        case 0:
          hideClearButton($(currentDropDown).find(clearButtonClass));
          break;
        default:
          showClearButton($(currentDropDown).find(clearButtonClass));
          break;
      }
      setTextToLabel(currentDropDown, getTextForGuestLabel(res));
      break;
    }

    case dropdownRoomAmenitiesType: {
      let values = [];
      $(valueClass, currentDropDown).each(function() {
        values.push($(this).text());
      });
      setTextToLabel(currentDropDown, getTextForRoomAmenitiesLabel(values));
      break;
    }
  }
}

function setTextToLabel(dropdown, text) {
  $(dropdown)
    .find(labelTextClass)
    .text(text);
}

//Get the string with the word "гость" in the correct declension
function getTextForGuestLabel(n) {
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

function getTextForRoomAmenitiesLabel(values = []) {
  let res = "";
  let declensions = [
    { one: "спальня", two: "спальни", five: "спален" },
    { one: "кровать", two: "кровати", five: "кроватей" },
    { one: "ванная комната", two: "ванные комнаты", five: "ванных комнат" }
  ];

  for (let i = 0; i < values.length; i++) {
    let n = values[i];
    count = n;

    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n1 > 1 && n1 < 5 && !(count > 10 && count < 20)) {
      res += values[i] + " " + declensions[i].two + ", ";
    } else if (n1 == 1 && !(count > 10 && count < 20)) {
      res += values[i] + " " + declensions[i].one + ", ";
    } else {
      if (values[i] != 0) res += values[i] + " " + declensions[i].five + ", ";
    }
  }
  res = res.substring(0, res.length - 2);
  if (res.split(", ").length == 3) {
    let res_split = res.split(", ");
    res = res_split[0] + ", " + res_split[1] + "...";
  }

  return res;
}

function updateDecStyle(dropdownMenu) {
  $(dropdownMenu)
    .find(valueClass)
    .each(function() {
      if ($(this).text() == "0") {
        $(this)
          .parent()
          .find(changeButtonClass)
          .first()
          .addClass(changeButtonDisabledClass);
      } else {
        $(this)
          .parent()
          .find(changeButtonClass)
          .first()
          .removeClass(changeButtonDisabledClass);
      }
    });
}
