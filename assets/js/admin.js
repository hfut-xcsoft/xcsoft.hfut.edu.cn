function insertAtCaret(areaId,text) {
  var txtarea = document.getElementById(areaId);
  var scrollPos = txtarea.scrollTop;
  var strPos = 0;
  var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
    "ff" : (document.selection ? "ie" : false ) );
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    strPos = range.text.length;
  }
  else if (br == "ff") strPos = txtarea.selectionStart;

  var front = (txtarea.value).substring(0,strPos);
  var back = (txtarea.value).substring(strPos,txtarea.value.length);
  txtarea.value=front+text+back;
  strPos = strPos + text.length;
  if (br == "ie") {
    txtarea.focus();
    var range = document.selection.createRange();
    range.moveStart ('character', -txtarea.value.length);
    range.moveStart ('character', strPos);
    range.moveEnd ('character', 0);
    range.select();
  }
  else if (br == "ff") {
    txtarea.selectionStart = strPos;
    txtarea.selectionEnd = strPos;
    txtarea.focus();
  }
  txtarea.scrollTop = scrollPos;
}

var uploaderInMark = new ss.SimpleUpload({
  button: 'mark_upload',
  url: '/file_upload.php',
  name: 'imgFile',
  responseType: 'json',
  allowedExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  encodeCustomHeaders: true,
  maxSize: 2048, // kilobytes
  onComplete: function (filename, response) {
    if (!response) {
      alert(filename + 'upload failed');
      return false;
    }
    if (!response.success) {
      alert('上传失败! ' + response.msg);
      return false;
    }
    var markStr = '![pic_name](' + response.url + ')\r\n';
    insertAtCaret('markdown', markStr)
  }
})