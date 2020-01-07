let checkBoxItemClass = ".checkbox-item";
let checkBoxItemBoldClass = ".checkbox-item_bold";
let checkBoxItemMarkClass = ".checkbox-item__mark";
let checkBoxItemMarkCheckClass = ".checkbox-item__mark_check";

$([checkBoxItemClass, checkBoxItemBoldClass].join(", ")).click(function() {
  let currentInput = $("input", this);
  let currentSpan = $("span", this);

  if (currentInput.attr("checked")) {
    currentInput.removeAttr("checked");
    currentSpan.toggleClass(
      [checkBoxItemMarkCheckClass.slice(1), checkBoxItemMarkClass.slice(1)],
      0
    );
  } else {
    currentInput.attr("checked", "checked");
    currentSpan.toggleClass(
      [checkBoxItemMarkCheckClass.slice(1), checkBoxItemMarkClass.slice(1)],
      0
    );
  }
});
