typeface = "Times New Roman"
size = "100%"

readData = ->
  typeface = loadCookie("typeface")
  size = loadCookie("size")
  console.log(typeface + ", " + loadCookie(typeface))

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
  console.log(document.cookie)

saveCookie("typeface","Times New Roman",365)
readData()
