
$(document).ready(function() {
  $("#merchant_source_list").select2({
    data: farm_names,
    multiple: true,
    createSearchChoice: function() { return null; },
    tokenSeparators: [",", " "],
    width: 'resolve'
  });
});