function getData() {
    let regionSelect = document.getElementById('region-radio-wrapper')
    let productSelect = document.getElementById('product-radio-wrapper')
    let checkOne = regionSelect.querySelectorAll('input[type="checkbox"]:checked')
    let checkTwo = productSelect.querySelectorAll('input[type="checkbox"]:checked')
    let data = []
    if (checkOne.length >= checkTwo.length) {
        for (let i = 0; i < checkOne.length; i++) {
            for (let j = 0; j < sourceData.length; j++) {
                if (sourceData[j].region === checkOne[i].value) {
                    if (checkTwo.length > 0) {
                        for (let k = 0; k < checkTwo.length; k++) {
                            if (sourceData[j].region === checkOne[i].value && sourceData[j].product === checkTwo[k].value) {
                                data.push(sourceData[j])
                            }
                        }
                    } else {
                        data.push(sourceData[j])
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < checkTwo.length; i++) {
            for (let j = 0; j < sourceData.length; j++) {
                if (sourceData[j].product === checkTwo[i].value) {
                    if (checkOne.length > 0) {
                        for (let k = 0; k < checkOne.length; k++) {
                            if (sourceData[j].product === checkTwo[i].value && sourceData[j].region === checkOne[k].value) {
                                data.push(sourceData[j])
                            }
                        }
                    } else {
                        data.push(sourceData[j])
                    }
                }
            }
        }
    }
    return data
}
function newTable(data) {
    data = data.map(o => ({ ...o }))
    let Div = document.getElementById('table-wrapper')
    let checkOne = regionSelect.querySelectorAll('input[type="checkbox"]:checked')
    let checkTwo = productSelect.querySelectorAll('input[type="checkbox"]:checked')
    let otherOne = Array.prototype.filter.call(checkOne, (item) => {
        return item.checkboxType !== 'all'
    })
    let otherTwo = Array.prototype.filter.call(checkTwo, (item) => {
        return item.checkboxType !== 'all'
    })
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    let trh = document.createElement('tr')
    let th = (function () {
        if (checkOne.length < checkTwo.length) {
            return ['地区', '商品', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        } else {
            return ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    })()
    if (checkOne.length < checkTwo.length) {
        data.forEach((item) => {
            [item.product, item.region] = [item.region, item.product]
        })
    }
    data.sort((a, b) => {
        return a.product.localeCompare(b.product)
    })
    th.forEach((index) => {
        let th = document.createElement('th')
        th.innerHTML = index
        trh.appendChild(th)
    })
    let a = []
    data.forEach((item) => {
        let tr = document.createElement('tr')
        tbody.appendChild(tr)
        for (let [key, val] of Object.entries(item)) {
            let td = document.createElement('td')
            if (typeof (val) !== 'object') {
                if (key === 'product') {
                    if (a.includes(val)) {
                        val = ''
                    } else {
                        a.push(val)
                        if (otherOne.length < otherTwo.length) {
                            td.rowSpan = otherTwo.length
                        } else {
                            td.rowSpan = otherOne.length
                        }
                        td.innerText = val
                        tr.appendChild(td)
                    }
                } else {
                    td.innerText = val
                    tr.appendChild(td)
                }
            } else {
                for (let [index, v] of Object.entries(val)) {
                    let td = document.createElement('td')
                    let token=item.product+item.region+index
                    td.onclick = function (e) {
                        e.stopPropagation()
                        let target=e.target
                        let input = document.createElement('input')
                        let button1 = document.createElement('button')
                        let button2 = document.createElement('button')
                        button1.innerText = '取消'
                        button2.innerText = '确定'
                        input.type = 'text'
                        function define(){
                            if (input.value != '') {
                                localStorage.setItem(token,input.value)
                                td.innerText = input.value
                            } else {
                                alert('请输入数字或点击取消')
                            }
                        }
                        function remove(){
                            if (localStorage.getItem(token)) {
                                td.innerHTML = td.innerHTML = localStorage.getItem(token)
                            } else {
                                td.innerHTML = v
                            }
                        }
                        input.onkeyup = function (e) {
                            e.stopPropagation()
                            let val = input.value
                            if (!(val == parseInt(val)) && val != '') {
                                alert('请输入正确的数字')
                            }
                            if (e.keyCode === 27) {
                                remove()
                            }
                            if (e.keyCode === 13) {
                                define()
                            }
                        }
                        //input.onblur=remove
                        button1.onclick = function (e) {
                            e.stopPropagation()
                            remove()
                        }
                        button2.onclick = function (e) {
                            e.stopPropagation()
                            define()
                        }
                        let children = td.childNodes
                        let find = Array.prototype.find.call(children, (c => c.tagName === 'INPUT'))
                        if (!find) {
                            td.innerText = ''
                            td.appendChild(input)
                            input.focus()
                            td.appendChild(button1)
                            td.appendChild(button2)
                        }
                    }
                    td.id = 'edit'
                    td.sale = v
                    if(localStorage.getItem(token)){
                        td.innerText=localStorage.getItem(token)
                    }else{
                        td.innerText = v
                    }
                    tr.appendChild(td)
                }
            }
        }
    })
    let child = Div.childNodes
    for (let i = child.length - 1; i >= 0; i--) {
        Div.removeChild(child[i])
    }
    Div.appendChild(table)
    table.appendChild(thead)
    thead.appendChild(trh)
    table.appendChild(tbody)
}