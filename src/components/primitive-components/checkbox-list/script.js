$(".checkBoxTitle.expandable").click(function() {
  if ($(".listItems.expandable").css("display") == "none")
    $(".listItems.expandable").show(200);
  else $(".listItems.expandable").hide(200);
});
