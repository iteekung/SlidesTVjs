/* setup
  ***** Create div id="SlidesTV"
  ***** add content div class="slide-item"

  type : 0=normal ,1=infinity loop
  pagination : true=have pagination ,false=no pagination


*/
SlidesTV = {
  type         : 1,
  pagination   : true,

  index        : 1,
  left         : 0,
  top          : 0,
  width        : 600,
  height       : 200,
  size         : 0,

  dulation     : 500,

  success      : true,
};

SlidesTV.Initial = function() {
  this.size = $("#SlidesTV div.slide-item").length;


  var HTML_TEMP = '';

  HTML_TEMP += '<div id="SlidesTV-container">';
  HTML_TEMP += '  <div id="SlidesTV-control">';
  HTML_TEMP += '  </div>';
  HTML_TEMP += '</div>';

  $("#SlidesTV").append(HTML_TEMP);

  $("#SlidesTV").css({"position":"relative","width":SlidesTV.width+"px","height":SlidesTV.height+"px"});
  $("#SlidesTV-container").css({"position":"relative","width":SlidesTV.width+"px","height":SlidesTV.height+"px"});

  SlidesTV.AddContent();
  if (SlidesTV.pagination) {
    SlidesTV.CreatePagination();
  }
  SlidesTV.Select();

};

SlidesTV.AddContent = function() {
  for (var i=0; i<this.size; i++) {
    var SlideItem = $("#SlidesTV div.slide-item").eq(0);
    SlideItem.addClass("Slide-item-"+i);
    $("#SlidesTV-control").append(SlideItem);
    SlideItem.css({"position":"absolute","display":"block","left":(i*SlidesTV.width)+"px","top":"0px","width":"100%","height":"100%","opacity":"0.7"});
  }
  $("#SlidesTV-control").css({"left":"-"+(SlidesTV.width*SlidesTV.index)+"px"});
};

SlidesTV.CreatePagination = function() {

  var HTML_TEMP = '';
  HTML_TEMP += '<ul id="SlidesTV-pagination">';
    for (var i=0; i<this.size; i++) {
      HTML_TEMP += '  <li class="pagintion-item-'+i+'">';
      HTML_TEMP += '    <div class="pagination"></div>';
      HTML_TEMP += '  </li>';
    }
  HTML_TEMP += '</ul>';

  $("#SlidesTV").append(HTML_TEMP);
};

SlidesTV.Next = function() {

  if (SlidesTV.success) {
    SlidesTV.success = false;
    switch (SlidesTV.type) {
    case 1: // infinity loop
      var range = SlidesTV.size*SlidesTV.width;
      if (SlidesTV.index == SlidesTV.size-1) {
        SlidesTV.index = 0;
      }else {
        SlidesTV.index++;
      }

      $("#SlidesTV-control").animate({"left":"-="+SlidesTV.width+"px"},SlidesTV.dulation);
      SlidesTV.Select();
      setTimeout(function () {
        var SlideItem = $("#SlidesTV-control div.slide-item").eq(0);
        SlideItem.css("left","+="+range+"px");
        $("#SlidesTV-control").append(SlideItem);

      }, SlidesTV.dulation);
      break;
    default: // default is slide normal end
      if (SlidesTV.index < SlidesTV.size-1) {
        SlidesTV.index++;
        $("#SlidesTV-control").animate({"left":"-="+SlidesTV.width+"px"},SlidesTV.dulation);
        SlidesTV.Select();
      }
    }

    setTimeout(function(){
      SlidesTV.success = true;
    },SlidesTV.dulation);
  }
};

SlidesTV.Back = function() {
  if (SlidesTV.success) {
    SlidesTV.success = false;
    switch (SlidesTV.type) {
    case 1: // infinity loop
      var range = SlidesTV.size*SlidesTV.width;

      var SlideItem = $("#SlidesTV-control div.slide-item").eq(SlidesTV.size-1);
      SlideItem.css("left","-="+range+"px");
      $("#SlidesTV-control").prepend(SlideItem);

      if (SlidesTV.index == 0) {
        SlidesTV.index = SlidesTV.size-1;
      }else {
        SlidesTV.index--;
      }

      $("#SlidesTV-control").animate({"left":"+="+SlidesTV.width+"px"},SlidesTV.dulation);
      SlidesTV.Select();
      break;
    default: // default is slide normal end
      if (SlidesTV.index > 0) {
        SlidesTV.index--;
        $("#SlidesTV-control").animate({"left":"+="+SlidesTV.width+"px"},SlidesTV.dulation);
        SlidesTV.Select();
      }
    }
    setTimeout(function(){
      SlidesTV.success = true;
    },SlidesTV.dulation);
  }
};

SlidesTV.Select = function() {
  for (var i=0; i<this.size; i++) {
    $("#SlidesTV-control .Slide-item-"+i).animate({"opacity":"0.7"});
    $("#SlidesTV-pagination li.pagintion-item-"+i+" div").removeClass("pagination-active");
  }
  $("#SlidesTV-control .Slide-item-"+SlidesTV.index).animate({"opacity":"1.0"},SlidesTV.dulation);
  $("#SlidesTV-pagination li.pagintion-item-"+SlidesTV.index+" div").addClass("pagination-active");
};
