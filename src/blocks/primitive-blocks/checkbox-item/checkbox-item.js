let checkBoxItemClass = ".checkbox-item";
let checkBoxItemMarkClass = ".checkbox-item__mark";
let checkBoxItemMarkCheckClass = ".checkbox-item__mark_check";

$(checkBoxItemClass).click(function() {
  if ($("input", this).attr("checked")) {
    $("input", this).removeAttr("checked");
    $("span", this)
      .removeClass(checkBoxItemMarkCheckClass.slice(1))
      .addClass(checkBoxItemMarkClass.slice(1));
  } else {
    $("input", this).attr("checked", "checked");
    $("span", this)
      .removeClass(checkBoxItemMarkClass.slice(1))
      .addClass(checkBoxItemMarkCheckClass.slice(1));
  }
});
