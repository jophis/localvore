// not a tag so needs name and farm_id
$(document).ready(function() {
  $("#merchant_source_list").select2({
    tags: farm_names,
    createSearchChoice: function() { return null; },
    tokenSeparators: [",", " "],
    width: 'resolve'
  });
});