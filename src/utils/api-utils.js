export const postData = (url, body) => {
    let xhr = new XMLHttpRequest;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.withCredentials = 'true';
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            console.log("response 4: " + xhr.responseText);
        } else {
            console.log("state " + xhr.readyState);
        }
    }
    xhr.send(body);
}