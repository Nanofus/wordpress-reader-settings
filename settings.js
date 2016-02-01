var enabled, lineHeight, loadCookie, loadData, paragraphMargin, replaceCss, resetData, rootPath, rootPathCheck, saveCookie, saveData, size, typeface, width;

rootPath = "/";

rootPathCheck = true;

typeface = '';

size = '';

width = '';

lineHeight = '';

paragraphMargin = '';

enabled = true;

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
  return document.cookie = cname + '=' + cvalue + '; ' + expires + ';domain=klaanon.bioklaani.fi;path=/';
};

saveData = function() {
  saveCookie("wrs-typeface", document.getElementById("wrs-font").value, 365);
  saveCookie("wrs-size", document.getElementById("wrs-font-size").value, 365);
  saveCookie("wrs-width", document.getElementById("wrs-content-width").value, 365);
  saveCookie("wrs-height", document.getElementById("wrs-line-height").value, 365);
  saveCookie("wrs-margin", document.getElementById("wrs-paragraph-margin").value, 365);
  if (document.getElementById("wrs-enabled").checked) {
    saveCookie("wrs-enabled", "true", 365);
  } else {
    saveCookie("wrs-enabled", "false", 365);
  }
  return location.reload();
};

resetData = function() {
  typeface = "Times New Roman";
  size = "100%";
  width = "600px";
  enabled = "true";
  lineHeight = "15";
  paragraphMargin = "24px";
  document.getElementById("wrs-font").value = typeface;
  document.getElementById("wrs-font-size").value = size;
  document.getElementById("wrs-content-width").value = width;
  document.getElementById("wrs-line-height").value = lineHeight;
  document.getElementById("wrs-paragraph-margin").value = paragraphMargin;
  if (enabled === "true") {
    document.getElementById("wrs-enabled").checked = true;
  } else {
    document.getElementById("wrs-enabled").checked = false;
  }
  return saveData();
};

loadData = function() {
  typeface = loadCookie("wrs-typeface");
  size = loadCookie("wrs-size");
  width = loadCookie("wrs-width");
  enabled = loadCookie("wrs-enabled");
  lineHeight = loadCookie("wrs-height");
  paragraphMargin = loadCookie("wrs-margin");
  if (typeface === '') {
    typeface = "Times New Roman";
  }
  if (size === '') {
    size = "100%";
  }
  if (width === '') {
    width = "600px";
  }
  if (enabled === '') {
    enabled = "true";
  }
  if (lineHeight === '') {
    lineHeight = "15";
  }
  if (paragraphMargin === '') {
    paragraphMargin = "24px";
  }
  document.getElementById("wrs-font").value = typeface;
  document.getElementById("wrs-font-size").value = size;
  document.getElementById("wrs-content-width").value = width;
  document.getElementById("wrs-line-height").value = lineHeight;
  document.getElementById("wrs-paragraph-margin").value = paragraphMargin;
  if (enabled === "true") {
    document.getElementById("wrs-enabled").checked = true;
  } else {
    document.getElementById("wrs-enabled").checked = false;
  }
  if (enabled === "true") {
    return replaceCss();
  }
};

replaceCss = function() {
  var content, contentChildren, d, i, j, len, paragraphs, results;
  if (!rootPathCheck || (window.location.pathname !== rootPath && rootPathCheck)) {
    content = document.getElementsByClassName("entry-content")[0];
    content.classList.add("wps-" + width);
    contentChildren = content.childNodes;
    i = 0;
    paragraphs = [];
    while (i < contentChildren.length) {
      if (contentChildren[i].nodeName === 'P') {
        paragraphs.push(contentChildren[i]);
      }
      if (contentChildren[i].nodeType === 1) {
        contentChildren[i].classList.add("wps-" + size.substring(0, size.length - 1));
        if (contentChildren[i].tagName !== 'H1' && contentChildren[i].tagName !== 'H2' && contentChildren[i].tagName !== 'H3' && contentChildren[i].tagName !== 'H4' && contentChildren[i].tagName !== 'H5' && contentChildren[i].tagName !== 'H6') {
          contentChildren[i].classList.add("wps-line-" + lineHeight);
        }
      }
      i++;
    }
    results = [];
    for (i = j = 0, len = paragraphs.length; j < len; i = ++j) {
      d = paragraphs[i];
      d.classList.add("wps-paragraph-" + paragraphMargin);
      if (typeface === "Times New Roman") {
        results.push(d.classList.add("wps-times"));
      } else if (typeface === "Arial") {
        results.push(d.classList.add("wps-arial"));
      } else if (typeface === "Open Sans") {
        results.push(d.classList.add("wps-opensans"));
      } else if (typeface === "Roboto") {
        results.push(d.classList.add("wps-roboto"));
      } else if (typeface === "Roboto Slab") {
        results.push(d.classList.add("wps-roboto-slab"));
      } else if (typeface === "Lora") {
        results.push(d.classList.add("wps-lora"));
      } else if (typeface === "Merriweather") {
        results.push(d.classList.add("wps-merriweather"));
      } else if (typeface === "PT Serif") {
        results.push(d.classList.add("wps-pt-serif"));
      } else if (typeface === "Slabo 27px") {
        results.push(d.classList.add("wps-slabo"));
      } else if (typeface === "Source Sans Pro") {
        results.push(d.classList.add("wps-source"));
      } else if (typeface === "Droid Sans") {
        results.push(d.classList.add("wps-droid"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};

loadData();
