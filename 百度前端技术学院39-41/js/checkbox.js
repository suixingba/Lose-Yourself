function createCheckBox(container, option) {
    let checkAll = document.createElement('input')
    let label = document.createElement('label')
    checkAll.type = 'checkbox'
    checkAll.id = Math.random()
    checkAll.checkboxType = 'all'
    label.htmlFor = checkAll.id
    label.innerHTML = '全选'
    option.forEach((item) => {
        let checkbox = document.createElement('input')
        let label = document.createElement('label')
        checkbox.type = 'checkbox'
        checkbox.id = item.text
        checkbox.value = item.text
        label.htmlFor = item.text
        label.innerHTML = item.text
        container.appendChild(checkbox)
        container.appendChild(label)
    })
    container.appendChild(checkAll)
    container.appendChild(label)
    container.onclick = (e) => {
        if (e.target.type === 'checkbox') {
            let checkboxType = e.target.checkboxType
            let allCheckbox = container.querySelectorAll('input[type="checkbox"]')
            let allChecked = container.querySelectorAll('input[type="checkbox"]:checked')
            if (checkboxType === 'all') {
                allCheckbox.forEach((item) => {
                    item.checked = true
                })
            } else {
                let checkedAll = Array.prototype.filter.call(allCheckbox, (item) => {
                    return item.checkboxType === 'all'
                })
                let other = Array.prototype.filter.call(allCheckbox, (item) => {
                    return item.checkboxType !== 'all'
                })
                if (allChecked.length < 1) {
                    return false
                } else {
                    let every = other.every((item) => {
                        return item.checked === true
                    })
                    if (every) {
                        checkedAll[0].checked = true
                    } else {
                        checkedAll[0].checked = false
                    }
                }
            }
        }
    }
}
