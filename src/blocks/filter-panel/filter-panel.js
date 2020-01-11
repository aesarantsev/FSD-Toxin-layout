import "../text-field/text-field";
import "../dropdown/dropdown";
import "../range-slider/range-slider";
import "../checkbox-list/checkbox-list";
import "../checkbox-list-rich/checkbox-list-rich";

const filterPanelToggleElement = $(".filter-panel__toggle");
const filterPanelContentElement = $(".filter-panel__content");

filterPanelToggleElement.click(function() {
  if (filterPanelContentElement.css("display") == "none")
    filterPanelContentElement.show(100);
  else filterPanelContentElement.hide(100);

  $("body,html").animate({ scrollTop: 0 }, 400);
});

function windowSize() {
  if ($(window).width() > 982)
  filterPanelContentElement.css("display", "block");
}

$(window).on("load resize", windowSize);
