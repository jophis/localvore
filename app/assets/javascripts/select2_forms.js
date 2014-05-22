
$(document).ready(function() {
  $("#merchant_farm_ids").select2();


  if (window.tag_names) {
    $("#merchant_tag_list").select2({
      tags: tag_names,
      createSearchChoice: function() { return null; },
      tokenSeparators: [",", " "],
      width: 'resolve'
    });
  }

  if (window.tag_names) {
    $("#farm_tag_list").select2({
      tags: tag_names,
      createSearchChoice: function() { return null; },
      tokenSeparators: [",", " "],
      width: 'resolve'
    });
  }


  if (window.merchant_names) {
    $("#farm_vendor_list").select2({
      data: merchant_names,
      multiple: true,
      createSearchChoice: function() { return null; },
      tokenSeparators: [",", " "],
      width: 'resolve'
    });
  }
});