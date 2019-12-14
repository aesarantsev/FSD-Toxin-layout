//Classes
let dropdownClass = ".dropdown";
//Label
let labelClass = ".dropdown__label";
let labelTextClass = ".dropdown__label__text";
let labelArrowClass = ".dropdown__label__arrow";
let labelArrowReflectedClass = ".dropdown__label__arrow_reflected";
//Menu
let menuClass = ".dropdown__menu";
let changeButtonClass = ".dropdown__item__change";
let changeButtonDisabledClass = "dropdown__item__change_disabled";
let valueClass = ".dropdown__item__value";
let applyButtonClass = ".dropdown__btn_apply";
let clearButtonClass = ".dropdown__btn_clear";

//Params
let timeoutAnimation = 160;

jQuery(document).ready(function(e) {
  updateLabel();

  //#region 'Show and Hide menu'
  {
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
    updateLabel();
  });

  //Click on Clear
  $(clearButtonClass).click(function() {
    let menu = $(this).closest(menuClass);

    $(valueClass, menu).each(function() {
      $(this).text("0");
    });

    updateLabel();
    updateDecStyle(menu);
    hideClearButton(this);
  });

  //Click on apply
  $(applyButtonClass).click(function() {
    let currentDropDown = $(this).closest(dropdownClass);
    hideMenu(currentDropDown);
  });
});

function showClearButton(clearButton) {
  $(clearButton).show(timeoutAnimation);
}

function hideClearButton(clearButton) {
  $(clearButton).hide(timeoutAnimation);
}

function updateLabel() {
  //Find all dropdowns
  $(dropdownClass).each(function() {
    let res = 0;
    $(valueClass, this).each(function() {
      res += $(this).text() * 1;
    });
    switch (res) {
      case 0:
        hideClearButton($(this).find(clearButtonClass));
        break;
      default:
        showClearButton($(this).find(clearButtonClass));
        break;
    }
    setTextToLabel(this, getTextForLabel(res));
  });
}

function setTextToLabel(dropdown, text) {
  $(dropdown)
    .find(labelTextClass)
    .text(text);
}

//Get the string with the word "гость" in the correct declension
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
