//Classes
let checkBoxListExpanableTitleClass = ".checkbox-list__title_expandable";
let checkBoxListExpanableItemsClass = ".checkbox-list__items_expandable";

//Params
let timeoutAnimation = 150;

jQuery(document).ready(function(e) {
  $(checkBoxListExpanableTitleClass).click(function() {
    let currentCheckBoxList = $(this).parent();
    let currentCheckBoxItems = $(
      checkBoxListExpanableItemsClass,
      currentCheckBoxList
    );

    if (currentCheckBoxItems.css("display") == "none")
      currentCheckBoxItems.show(timeoutAnimation);
    else currentCheckBoxItems.hide(timeoutAnimation);
  });
});
