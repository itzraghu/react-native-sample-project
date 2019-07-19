export default function API( apiName, apiMethod,variables, token) {
    const baseUrl = 'https://crm-web-webapi.azurewebsites.net/'  //staging url
  
    
    var init = apiMethod === 'POST' ? 
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization' : `Bearer  ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
          },
            body: variables ? variables.toString() : null,
          json: true,
        }
        :
        {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer  ${token}`,
              "Content-Type": "application/x-www-form-urlencoded"
          },
            // body: variables.toString(),
          json: true,
        }
    

        
    
    return fetch(baseUrl + apiName,init)

            .then(res => res.json()
            .then(data => {
                console.log("getResponse", JSON.stringify(data))
                return data;
            })
            )
        .catch(err => {
            console.log("asd")
            var errData = { response_code: 1002, response_message: "Network Request Failed." }
            return errData;
        });
}
