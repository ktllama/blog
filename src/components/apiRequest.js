//going to create an import to use function for all of the operations in CRUD (minue read bc we already have that)
//use this one function for create, update and delete

const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    //optionsObj is what makes the difference btwn this being a create, update or delete request
    try{
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('Please reload the app'); //put this error different from read error bc our app may be out of sync- reloading app will make state of applicattion in state with server
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}
//will return errMsg no matter if its null or has a value
//dont need response back bc we are updating the state with setItems and other functions and then using this to update the server and keep that state of our app and server in sync
//can update our state faster then we get a reponse from the api- so we dont want to wait for that response
//if we do get an error message we will know we are out of sync w api and will display please reload errmessage

export default apiRequest;