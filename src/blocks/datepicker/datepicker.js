//Classes
let datePickerClass = ".datepicker-here";

let currentDatePicker;

let generalSettings = {
  classes: "my-custom-datepicker",
  navTitles: {
    days: "MM <i>yyyy</i>"
  },
  prevHtml: "<i class='material-icons md-24 md-purple'>arrow_back</i>",
  nextHtml: "<i class='material-icons md-24 md-purple'>arrow_forward</i>"
};

let oneInputSettings = {
  dateFormat: "d M",
  multipleDatesSeparator: " - ",
  inline: false
};

var myDatepicker = $(".datepicker-here")
  .datepicker()
  .data("datepicker");

var DatePickers = [];
$(".datepicker-here").each(function() {
  DatePickers.push(
    $(this)
      .datepicker()
      .data("datepicker")
  );
});

//Общие настройки датапикера
$(".datepicker-here").datepicker(generalSettings);

//Настройки датапикера c одним инпутом
$(".datepicker-here")
  .not(".start_one")
  .not(".end_one")
  .datepicker(oneInputSettings);

//Вставляем кнопки Очистить и Применить
$(".datepicker--content").append(`
<div class = 'datepicker--content--buttons'>
  <button class='datepicker__clear'>Очистить</button>
  <button class='datepicker__apply'>Применить</button>
</div>

`);

$(datePickerClass).click(function() {
  currentDatePicker = $(this)
    .datepicker()
    .data("datepicker");
});

$(".datepicker__apply").click(function() {
  currentDatePicker.hide();
});

$(".datepicker__clear").click(function() {
  currentDatePicker.clear();
});

$(".start_one").datepicker({
  onSelect: function(fd, date, picker) {
    console.log("this", this);
    $(".start_one").val(fd.split(",")[0]);
    $(".end_one").val(fd.split(",")[1]);
  }
});

// $(".end_one").click(function() {
//   myDatepicker.show();
// });
