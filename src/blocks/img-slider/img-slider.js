jQuery(document).ready(function(e) {
  //Classes
  let sliderClass = ".img-slider";
  let prevButtonClass = ".img-slider__toggle_prev";
  let nextButtonClass = ".img-slider__toggle_next";
  let sliderItemClass = ".img-slider__item";
  let sliderButtonDotClass = ".img-slider__buttons__dot";

  let slideIndex = 1;

  //Show first image on all sliders
  $(sliderClass).each(function(i, slider) {
    showSlide(this, slideIndex);
  });

  //Click on next button
  $(nextButtonClass).click(function() {
    let currentSlider = $(this).parent();
    let nextSlide = 0;
    let countSlides = $(sliderItemClass, currentSlider).length;

    $(sliderItemClass, currentSlider).each(function(i, item) {
      if ($(item).css("display") == "block")
        nextSlide = countSlides < i + 2 ? 1 : i + 2;
    });

    showSlide(currentSlider, nextSlide);
  });

  //Click on prev button
  $(prevButtonClass).click(function() {
    let currentSlider = $(this).parent();
    let prevSlide = 0;
    let countSlides = $(sliderItemClass, currentSlider).length;

    $(sliderItemClass, currentSlider).each(function(i, item) {
      if ($(item).css("display") == "block")
        prevSlide = 2 > i ? countSlides : i;
    });

    showSlide(currentSlider, prevSlide);
  });

  //Click on dot buton
  $(sliderButtonDotClass).click(function() {
    let currentSlider = $(this)
      .parent()
      .parent();
    let thisDot = this;
    let countDot = 0;
    $(sliderButtonDotClass, currentSlider).each(function(i, dotItem) {
      if (dotItem == thisDot) {
        countDot = i + 1;
      }
    });
    showSlide(currentSlider, countDot);
  });

  //Show slide in slider
  function showSlide(slider, n) {
    $(sliderItemClass, slider).each(function(i, sliderItem) {
      if (i == n - 1) $(sliderItem).css("display", "block");
      else $(sliderItem).css("display", "none");
    });

    $(sliderButtonDotClass, slider).each(function(i, dotItem) {
      if (i == n - 1) $(dotItem).css("background", "#ffffff");
      else $(dotItem).css("background", "none");
    });
  }
});
