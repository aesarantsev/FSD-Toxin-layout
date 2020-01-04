//Classes
let likeButtonClass = ".like-button";
let likeButtonLikedClass = ".like-button_liked";
let likeButtonCountClass = ".like-button__count";
let likeButtonCountLikedClass = ".like-button__count_liked";
let likeButtonIcon = ".like-button__icon";
let likeButtonLikedIcon = ".like-button__icon_liked";

jQuery(document).ready(function(e) {
  $(likeButtonClass + "," + likeButtonLikedClass).click(function() {
    $(this).toggleClass(
      likeButtonClass.slice(1) + " " + likeButtonLikedClass.slice(1)
    );

    let currentValue = $(
      likeButtonCountClass + "," + likeButtonCountLikedClass,
      this
    )
      .find("span")
      .html();

    $(likeButtonCountClass, this)
      .find("span")
      .html((currentValue * 1 + 1).toString());

    $(likeButtonCountLikedClass, this)
      .find("span")
      .html((currentValue * 1 - 1).toString());

    $(likeButtonCountClass + "," + likeButtonCountLikedClass, this).toggleClass(
      likeButtonCountClass.slice(1) + " " + likeButtonCountLikedClass.slice(1)
    );

    let icon = $(likeButtonIcon + "," + likeButtonLikedIcon, this).find("i");

    icon.text(function() {
      console.log($(this));
      if ($(this).text() == "favorite") return "favorite_border";
      else return "favorite";
    });

    icon.toggleClass("md-purple");
  });
});
