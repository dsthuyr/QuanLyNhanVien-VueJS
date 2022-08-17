/**
 * Validate email
 * Author: dsthuyr (16/05/2022)
 */
 function isEmail(email) {
    if(email==undefined  || email=="") return true
    // eslint-disable-next-line no-useless-escape
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

/**
 * Validate DateOfBirth
 * 
 * Author: dsthuyr (16/05/2022)
 */
function isDOBValid(dob) {
    if(dob==undefined || dob=="Invalid Date") return true
    let dobFormat = new Date(dob)
    let current = new Date()
    if (current.getTime() >= dobFormat.getTime()) {
        return true
    }
    return false
}


export {isEmail, isDOBValid}