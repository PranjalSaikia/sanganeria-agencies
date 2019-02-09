import AuthService from './../auth_components/js/AuthService';


export function PostData(type, userData) {
    let Auth = new AuthService();
    let BaseURL = 'http://localhost/stock';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + Auth.getToken(),
                'Unit': '1'
            }
        })
            .then((resp) => {
                if (!resp.ok) {
                    if (resp.status >= 400 && resp.status < 500) {
                        /* return resp.json().then(data => {
                            let err = { errorMessage: data };
                            alert(err.errorMessage);
                            //logout
                            //Auth.logout();
                            throw err;
                        }) */
                        throw resp.text();
                    }
                    else {
                        let err = { errorMessage: "Please try again later" };
                        alert(`Something went Wrong!! Status: ${resp.status}`);
                        //logout
                        //Auth.logout();
                        throw resp.text();
                    }
                }else 
                return resp.json();
            }
            )
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                /* error.then((e) => {
                    console.log(e);
                    reject(error);
                }); */
                console.log(error)
            });
    });
}


export function GetData(type) {
    let Auth = new AuthService();
    let BaseURL = 'http://localhost/stock';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
                'Unit': '1'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw response.text()
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}



export function PostFormData(type, userData) {
    let Auth = new AuthService();
    let BaseURL = 'http://localhost/stock';
    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Auth.getToken(),
                'Unit': '1'
            }
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}