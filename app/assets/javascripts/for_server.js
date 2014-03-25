var StartupAssist = StartupAssist || {};


StartupAssist.saveInit = function(){
  var all_tag = $('.tag'),
      tag_hash = {};
  for (i = 0; i < all_tag.length; i++){
    tag_hash[i] = {};
    tag_hash[i].id = all_tag[i].id,
    tag_hash[i]['class'] = all_tag[i].getAttributeNS(null, 'class');
    tag_hash[i].rect = {};
    tag_hash[i].rect['class'] = all_tag[i].firstChild.getAttributeNS(null, 'class');
    tag_hash[i].rect.x = all_tag[i].firstChild.getAttributeNS(null, 'x');
    tag_hash[i].rect.y = all_tag[i].firstChild.getAttributeNS(null, 'y');
    tag_hash[i].rect.height = all_tag[i].firstChild.getAttributeNS(null, 'height');
    tag_hash[i].rect.width = all_tag[i].firstChild.getAttributeNS(null, 'width');
    tag_hash[i].rect.onmousedown = all_tag[i].firstChild.getAttributeNS(null, 'onmousedown');
    tag_hash[i].rect.transform = all_tag[i].firstChild.getAttributeNS(null, 'transform');
    tag_hash[i].rect.style = all_tag[i].firstChild.getAttributeNS(null, 'style');
    tag_hash[i].txt = {};
    tag_hash[i].txt['class'] = all_tag[i].lastChild.getAttributeNS(null, 'class');
    tag_hash[i].txt.x = all_tag[i].lastChild.getAttributeNS(null, 'x');
    tag_hash[i].txt.y = all_tag[i].lastChild.getAttributeNS(null, 'y');
    tag_hash[i].txt.width = all_tag[i].lastChild.getAttributeNS(null, 'width');
    tag_hash[i].txt.onmousedown = all_tag[i].lastChild.getAttributeNS(null, 'onmousedown');
    tag_hash[i].txt.transform = all_tag[i].lastChild.getAttributeNS(null, 'transform');
    tag_hash[i].txt.style = all_tag[i].lastChild.getAttributeNS(null, 'style');
    tag_hash[i].txt.inner = all_tag[i].lastChild.innerHTML;
  }

  StartupAssist.saveCanva(tag_hash);

};

StartupAssist.saveCanva = function(tag_hash){
  $.ajax({
    url: '/tags',
    type: 'GET',
    dataType: 'json',
    data: {param1: 'value1'}
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
};