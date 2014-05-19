$(document).ready(function() {
  $("#merchant_source_list").select2({
    tags: farm_names,
    tokenSeparators: [",", " "],
    width: 'resolve'
  });
});