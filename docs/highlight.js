// shows the code in the demo
window.onload = function()
{
    var client = new XMLHttpRequest()
    client.open('GET', 'code.js')
    client.onreadystatechange = function()
    {
        var code = document.getElementById('code')
        code.innerHTML = client.responseText
        require('highlight.js').highlightBlock(code)
    }
    client.send()
}

// for eslint
/* globals window, XMLHttpRequest, document */