jQuery(document).ready(function(e) {
  //Classes
  rangeClass = ".range-slider__range";
  sliderClass = ".range-slider__slider";

  //Slider params
  let values = [5000, 10000];
  let min = 0;
  let max = 15000;
  let step = 1000;

  setSliderRange($(rangeClass), values);

  $(sliderClass).slider({
    range: true,
    min,
    max,
    step,
    values,
    change: function(event, ui) {
      var value = $(this).slider("option", "values");
      var rangeElem = $(this)
        .parent()
        .find(rangeClass);

      setSliderRange(rangeElem, value);
    }
  });

  //Set values to label
  function setSliderRange(element = $(rangeClass), value) {
    element.text(
      addSpacesToNumber(value[0]) + "₽ - " + addSpacesToNumber(value[1]) + "₽"
    );
  }

  function addSpacesToNumber(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  }
});
