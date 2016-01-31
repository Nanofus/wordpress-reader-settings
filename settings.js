var loadCookie, loadData, replaceCss, resetData, saveCookie, saveData, size, typeface, width;

typeface = '';

size = '';

width = '';

loadCookie = function(cname) {
  var c, ca, i, name;
  name = cname + '=';
  ca = document.cookie.split(';');
  i = 0;
  while (i < ca.length) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
    i++;
  }
  return '';
};

saveCookie = function(cname, cvalue, exdays) {
  var d, expires;
  d = new Date;
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  expires = 'expires=' + d.toUTCString();
  return document.cookie = cname + '=' + cvalue + '; ' + expires;
};

saveData = function() {
  saveCookie("wrs-typeface", document.getElementById("wrs-font").value, 365);
  saveCookie("wrs-size", document.getElementById("wrs-font-size").value, 365);
  saveCookie("wrs-width", document.getElementById("wrs-content-width").value, 365);
  event.stopPropagation();
  return loadData();
};

resetData = function() {
  typeface = "Times New Roman";
  size = "100%";
  width = "606px";
  document.getElementById("wrs-font").value = typeface;
  document.getElementById("wrs-font-size").value = size;
  document.getElementById("wrs-content-width").value = width;
  event.stopPropagation();
  return saveData();
};

loadData = function() {
  typeface = loadCookie("wrs-typeface");
  size = loadCookie("wrs-size");
  width = loadCookie("wrs-width");
  if (typeface === '') {
    typeface = "Times New Roman";
  }
  if (size === '') {
    size = "100%";
  }
  if (width === '') {
    width = "606px";
  }
  document.getElementById("wrs-font").value = typeface;
  document.getElementById("wrs-font-size").value = size;
  document.getElementById("wrs-content-width").value = width;
  return replaceCss();
};

replaceCss = function() {
  var content, d, i, j, len, paragraphs;
  content = document.getElementsByClassName("entry-content")[0];
  paragraphs = content.getElementsByTagName("p");
  for (i = j = 0, len = paragraphs.length; j < len; i = ++j) {
    d = paragraphs[i];
    console.log(d);
    if (typeface === "Times New Roman") {
      d.classList.add("wps-times");
    } else if (typeface === "Arial") {
      d.classList.add("wps-arial");
    }
    d.classList.add("wps-" + size.substring(0, size.length - 1));
  }
  content.style.width = width + "!important";
  content.style.maxWidth = width + "!important";
  return content.style.minWidth = width + "!important";
};

loadData();
