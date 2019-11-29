let generalSettings = {
  classes: "my-custom-datepicker",
  navTitles: {
    days: "MM <i>yyyy</i>"
  },
  prevHtml: "<img src='../../../../assets/img/datepicker/arrow_back.svg'>",
  nextHtml: "<img src='../../../../assets/img/datepicker/arrow_forward.svg'>"
};

let oneInputSettings = {
  dateFormat: "d M",
  multipleDatesSeparator: " - ",
  inline: false
};

var myDatepicker = $(".datepicker-here")
  .datepicker()
  .data("datepicker");

//Общие настройки датапикера
$(".datepicker-here").datepicker(generalSettings);

//Настройки датапикера c одним инпутом
$(".datepicker-here")
  .not("#start_one")
  .datepicker(oneInputSettings);

//Вставляем кнопки Очистить и Применить
$(".datepicker--content").append(`
<div class = 'datepicker--content--buttons'>
  <button class='datepicker__clear'>Очистить</button>
  <button class='datepicker__apply'>Применить</button>
</div>

`);

$(".datepicker__apply").click(function() {
  myDatepicker.hide();
});

$(".datepicker__clear").click(function() {
  myDatepicker.clear();
});

$("#start_one").datepicker({
  onSelect: function(fd, d, picker) {
    $("#start_one").val(fd.split(",")[0]);
    $("#end_one").val(fd.split(",")[1]);
  }
});

$("#end_one").click(function() {
  myDatepicker.show();
});
