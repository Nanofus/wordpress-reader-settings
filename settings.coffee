

typeface = '';
size = '';
width = '';
enabled = true;

loadCookie = (cname) ->
  name = cname + '='
  ca = document.cookie.split(';')
  i = 0
  while i < ca.length
    c = ca[i]
    while c.charAt(0) == ' '
      c = c.substring(1)
    if c.indexOf(name) == 0
      return c.substring(name.length, c.length)
    i++
  ''

saveCookie = (cname, cvalue, exdays) ->
  d = new Date
  d.setTime d.getTime() + exdays * 24 * 60 * 60 * 1000
  expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + '; ' + expires + ';domain=klaanon.bioklaani.fi;path=/'

saveData = ->
  saveCookie("wrs-typeface", document.getElementById("wrs-font").value, 365)
  saveCookie("wrs-size", document.getElementById("wrs-font-size").value, 365)
  saveCookie("wrs-width", document.getElementById("wrs-content-width").value, 365)
  if document.getElementById("wrs-enabled").checked
    saveCookie("wrs-enabled", "true", 365)
  else
    saveCookie("wrs-enabled", "false", 365)
  location.reload();

resetData = ->
  typeface = "Times New Roman"
  size = "100%"
  width = "600px"
  enabled = "true"
  document.getElementById("wrs-font").value = typeface
  document.getElementById("wrs-font-size").value = size
  document.getElementById("wrs-content-width").value = width
  if enabled == "true"
    document.getElementById("wrs-enabled").checked = true
  else
    document.getElementById("wrs-enabled").checked = false
  saveData()

loadData = ->
  typeface = loadCookie("wrs-typeface")
  size = loadCookie("wrs-size")
  width = loadCookie("wrs-width")
  enabled = loadCookie("wrs-enabled")
  if typeface == ''
    typeface = "Times New Roman"
  if size == ''
    size = "100%"
  if width == ''
    width = "600px"
  if enabled == ''
    enabled = "true"
  document.getElementById("wrs-font").value = typeface
  document.getElementById("wrs-font-size").value = size
  document.getElementById("wrs-content-width").value = width
  if enabled == "true"
    document.getElementById("wrs-enabled").checked = true
  else
    document.getElementById("wrs-enabled").checked = false
  if enabled == "true"
    replaceCss()

replaceCss = ->
  content = document.getElementsByClassName("entry-content")[0]
  content.classList.add("wps-"+width)
  contentChildren = content.childNodes
  i = 0
  paragraphs = []
  while i < contentChildren.length
    if contentChildren[i].nodeName == 'P'
      paragraphs.push contentChildren[i]
    if contentChildren[i].nodeType == 1
      contentChildren[i].classList.add("wps-" + size.substring(0, size.length - 1));
    i++
  for d, i in paragraphs
    if (typeface == "Times New Roman")
      d.classList.add("wps-times")
    else if (typeface == "Arial")
      d.classList.add("wps-arial")
    else if (typeface == "Open Sans")
      d.classList.add("wps-opensans")
    else if (typeface == "Roboto")
      d.classList.add("wps-roboto")
    else if (typeface == "Slabo 27px")
      d.classList.add("wps-slabo")
    else if (typeface == "Source Sans Pro")
      d.classList.add("wps-source")
    else if (typeface == "Droid Sans")
      d.classList.add("wps-droid")

loadData()
