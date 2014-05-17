// $(function() {
//     function log( message ) {
//       $( "<div>" ).text( message ).prependTo( "#log" );
//       $( "#log" ).scrollTop( 0 );
//     }
 
//     $( "#merchant_source_list" ).autocomplete({
//       source: "/farms",
//       minLength: 2,
//       select: function( event, ui ) {
//         log( ui.item ?
//           "Selected: " + ui.item.value + " aka " + ui.item.id :
//           "Nothing selected, input was " + this.value );
//       }
//     });
//   });

// $(function(){
//   $('#select_origin').autocomplete({
//     minLength: 2,
//     source: '<%= @farms %>',
//     focus: function(event, ui) {
//       $('#select_origin').val(ui.item.farm.name);
//       return false;
//     },
//     select: function(event, ui) {
//       $('#select_origin').val(ui.item.farm.name);
//       $('#link_origin_id').val(ui.item.farm.id);
//       return false;
//     }
//   })
//   .data( "uiAutocomplete" )._renderItem = function( ul, item) {
//     return $( "<li></li> ")
//       .data("item.uiAutocomplete", item )
//       .append("<a>" + item.farm.name + "</a>")
//       .appendTo(ul);
//   };
// });
// console.log("hiii");