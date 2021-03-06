//Classes
let checkBoxListExpanableTitleClass = ".checkbox-list__title_expandable";
let checkBoxListExpanableItemsClass = ".checkbox-list__items_expandable";
let checkBoxListExpanableArrowClass = ".checkbox-list__title_expandable__arrow";
let checkBoxListExpanableArrowReflectedClass =
  ".checkbox-list__title_expandable__arrow_reflected";

//Params
let timeoutAnimation = 150;

jQuery(document).ready(function(e) {
  $(checkBoxListExpanableTitleClass).click(function() {
    let currentCheckBoxList = $(this).parent();
    let currentCheckBoxItems = $(
      checkBoxListExpanableItemsClass,
      currentCheckBoxList
    );
    let currentCheckBoxArrow = $(
      checkBoxListExpanableArrowClass,
      currentCheckBoxList
    );
    
    //Reflect arrow
    $(currentCheckBoxArrow).toggleClass(
      checkBoxListExpanableArrowReflectedClass.slice(1),
      checkBoxListExpanableArrowClass.slice(1)
    );


    if (currentCheckBoxItems.css("display") == "none")
      currentCheckBoxItems.show(timeoutAnimation);
    else currentCheckBoxItems.hide(timeoutAnimation);
  });
});
