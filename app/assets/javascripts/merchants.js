
$(document).ready(function() {
  $("#merchant_source_list").select2({
    data: farm_names,
    multiple: true,
    createSearchChoice: function() { return null; },
    tokenSeparators: [",", " "],
    width: 'resolve'
  });
});

$(document).ready(function() {
  $("#merchant_tag_list").select2({
    tags: tags,
    createSearchChoice: function() { return null; },
    tokenSeparators: [",", " "],
    width: 'resolve'
  });
});