let regionSelect = document.getElementById('region-radio-wrapper')
let productSelect = document.getElementById('product-radio-wrapper')
let tableBar = document.getElementById('table-bar-wrapper')
let tableLine = document.getElementById('table-line-wrapper')
let tableWrapper = document.getElementById('table-wrapper')
regionSelect.addEventListener('change', () => {
    //渲染新的表格（根据checkbox选项选取数据）
    newTable(getData())
    setHash()

})
productSelect.addEventListener('change', () => {
    //渲染新的表格（根据checkbox选项选取数据）
    newTable(getData())
    setHash()

})
let checkOne = [
    {
        value: '1',
        text: '华东'
    },
    {
        value: '2',
        text: '华南'
    },
    {
        value: '3',
        text: '华北'
    }
]
let checkTwo = [
    {
        value: '1',
        text: '手机'
    },
    {
        value: '2',
        text: '笔记本'
    },
    {
        value: '3',
        text: '智能音箱'
    }
]
createCheckBox(regionSelect, checkOne)
createCheckBox(productSelect, checkTwo)
function setHash() {
    let checkOne = regionSelect.querySelectorAll('input[type="checkbox"]:checked')
    let checkTwo = productSelect.querySelectorAll('input[type="checkbox"]:checked')
    let otherOne = Array.prototype.filter.call(checkOne, (item) => {
        return item.checkboxType !== 'all'
    })
    let otherTwo = Array.prototype.filter.call(checkTwo, (item) => {
        return item.checkboxType !== 'all'
    })
    let one = []
    let two = []
    otherOne.forEach((item) => {
        one.push(item.id)
    })
    otherTwo.forEach((item) => {
        two.push(item.id)
    })
    //window.location.hash = [...one, ...two]
    history.pushState([...one,...two],null,`#${[...one,...two]}`)
}
function setHashCheck() {
    let checkOne = regionSelect.querySelectorAll('input[type="checkbox"]')
    let checkTwo = productSelect.querySelectorAll('input[type="checkbox"]')
    let hash = decodeURIComponent(window.location.hash)
    hash = hash.split(',').join(',')
    hash=hash.replace('#','').split(',')
    let getCheck = [...checkOne, ...checkTwo]
    getCheck.forEach((item) => {
        if(hash!=''){
            if (hash.includes(item.id)) {
                item.checked = true
                newTable(getData())
            }else{
                item.checked=false
                newTable(getData())
            }
        }
    })
    let oneChecked=regionSelect.querySelectorAll('input[type="checkbox"]:checked')
    let twoChecked=productSelect.querySelectorAll('input[type="checkbox"]:checked')
    if(oneChecked.length===3)checkOne.forEach(item=>item.checked=true)
    if(twoChecked.length===3)checkTwo.forEach(item=>item.checked=true)
}
//window.onhashchange = function () {
//     setHashCheck()
// }
window.onpopstate=function () {
    setHashCheck()
}
setHashCheck()
