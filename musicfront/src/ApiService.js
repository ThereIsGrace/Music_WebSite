const { SERVER_URL } = require("./constants");

export function call(api, method, request){
    let options = {
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        url: SERVER_URL + api,
        method: method,
        mode: 'cors'
    };

    if(request){
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options).then((response) => {
        if(response.status === 200){
            return response.json();
        }else if (response.status === 403){
            window.location.href = "/login";  //redirect
        }else if (response.status === 400){
            console.log('bad request입니다.');
            return response.json();
        }else {
            Promise.reject(response);
            throw Error(response);
        }
    });
}