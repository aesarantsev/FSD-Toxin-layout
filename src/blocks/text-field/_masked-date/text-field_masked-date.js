import "jquery-mask-plugin";

const textFieldMaskedDateClass = ".js-text-field_masked-date";

$(function() {
  $(textFieldMaskedDateClass).mask("00.00.0000");
});


