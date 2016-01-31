typeface = '';
size = '';
width = '';

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
  document.cookie = cname + '=' + cvalue + '; ' + expires

saveData = ->
  saveCookie("wrs-typeface", document.getElementById("wrs-font").value, 365)
  saveCookie("wrs-size", document.getElementById("wrs-font-size").value, 365)
  saveCookie("wrs-width", document.getElementById("wrs-content-width").value, 365)
  event.stopPropagation()
  loadData()

resetData = ->
  typeface = "Times New Roman"
  size = "100%"
  width = "606px"
  document.getElementById("wrs-font").value = typeface
  document.getElementById("wrs-font-size").value = size
  document.getElementById("wrs-content-width").value = width
  event.stopPropagation()
  saveData()

loadData = ->
  typeface = loadCookie("wrs-typeface")
  size = loadCookie("wrs-size")
  width = loadCookie("wrs-width")
  if typeface == ''
    typeface = "Times New Roman"
  if size == ''
    size = "100%"
  if width == ''
    width = "606px"
  document.getElementById("wrs-font").value = typeface
  document.getElementById("wrs-font-size").value = size
  document.getElementById("wrs-content-width").value = width
  replaceCss()

replaceCss = ->
  content = document.getElementsByClassName("entry-content")[0]
  paragraphs = content.getElementsByTagName("p")
  for d, i in paragraphs
    console.log(d)
    if (typeface == "Times New Roman")
      d.classList.add("wps-times")
    else if (typeface == "Arial")
      d.classList.add("wps-arial")
    d.classList.add("wps-"+size.substring(0, size.length - 1))
  content.style.width = width + "!important"
  content.style.maxWidth = width + "!important"
  content.style.minWidth = width + "!important"

loadData()
