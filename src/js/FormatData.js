/**
 * Hàm định dạng hiển thị ngày/tháng/năm
 * @param {Date} date 
 * Author: dsthuyr (13/05/2022)
 */
 function formatDate(date) {
    if (date != null) {
        date = new Date(date);
        let day = date.getDay()
        day = day < 10 ? `0${day}` : day
        let month = date.getMonth() + 1
        month = month < 10 ? `0${month}` : month
        let year = date.getFullYear()

        return `${day}/${month}/${year}`   // VD: 13/5/2022
    }
    else {
        return ""
    }
}


/**
 * Hàm định dạng hiển thị lương 
 * @param {Number} salary
 * Author: dsthuyr (13/05/2022)
 */
function formatCurrencyVND(salary) {
    if (salary != null) {
        salary = 1234234923
        salary = (new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary))
        return salary
    }
    else {
        return ""
    }
}

/**
 * Hàm định dạng hiển thị checkbox
 * @param {boolean} check
 * Author: dsthuyr (13/05/2022)
 */
function formatCheckbox(check) {
    if (check != true) {
        return `<input type="checkbox" checked/>`
    }
    else {
        return `<input type="checkbox"/>`
    }
}

/**
 * Hàm định dạng hiển thị Giới tính (Gender)
 * @param {Number} gender
 * Author: dsthuyr (13/05/2022)
 */
function formatGender(gender) {
    if (gender == null) {
        return ""
    }
    else if (gender == 0) {
        return "Khác"
    }
    else if (gender == 1) {
        return "Nam"
    }
    else {
        return "Nữ"
    }
}

/**
 * Xử lí ngày tháng đầu vào, để đưa lên input
 * Author: dsthuyr (22/05/2022)
 */
 function formatDataForDateInput(date) {
    if (date != null) {
        date = new Date(date);
        let day = date.getDay()
        day = day < 10 ? `0${day}` : day
        let month = date.getMonth() + 1
        month = month < 10 ? `0${month}` : month
        let year = date.getFullYear()
        return `${year}-${month}-${day}`   // VD: 2022-05-13
    }
    else {
        return ""
    }
}

export {formatCheckbox, formatDate, formatGender, formatCurrencyVND, formatDataForDateInput}