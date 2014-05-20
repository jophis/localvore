
$(document).ready(function() {
  if (window.farm_names) {
    $("#merchant_source_list").select2({
      data: farm_names,
      multiple: true,
      createSearchChoice: function() { return null; },
      tokenSeparators: [",", " "],
      width: 'resolve'
    });
  }
});

$(document).ready(function() {
  if (window.tag_names) {
    $("#merchant_tag_list").select2({
      tags: tag_names,
      createSearchChoice: function() { return null; },
      tokenSeparators: [",", " "],
      width: 'resolve'
    });
  }
});