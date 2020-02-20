let regionSelect = document.getElementById('region-radio-wrapper')
let productSelect = document.getElementById('product-radio-wrapper')
let tableBar = document.getElementById('table-bar-wrapper')
let tableLine = document.getElementById('table-line-wrapper')
let tableWrapper = document.getElementById('table-wrapper')

regionSelect.onchange = () => {
    //渲染新的表格（根据checkbox选项选取数据）
    newTable(getData())
    // let lineData = getData()
    // let newLineData = []
    // lineData.forEach((item) => {
    //     for (let val of Object.values(item)) {
    //         if (typeof (val) === 'object') {
    //             newLineData.push(val)
    //         }
    //     }
    // })
    // deleteChild(tableLine)
    // tableLine.appendChild(line.setData(...newLineData))
}
productSelect.onchange = () => {
    //渲染新的表格（根据checkbox选项选取数据）
    newTable(getData())
    // let lineData = getData()
    // let newLineData = []
    // lineData.forEach((item) => {
    //     for (let val of Object.values(item)) {
    //         if (typeof (val) === 'object') {
    //             newLineData.push(val)
    //         }
    //     }
    // })
    // deleteChild(tableLine)
    // tableLine.appendChild(line.setData(...newLineData))
}
// tableWrapper.onmouseover = (e) => {
//     let target = e.target
//     if (target.tagName === 'TD') {
//         let data = []
//         let parent = target.parentNode
//         let children = parent.childNodes
//         children.forEach((item) => {
//             if (item.sale) {
//                 data.push(item.sale)
//             }
//         })
//         deleteChild(tableLine)
//         tableLine.appendChild(line.setData(data))
//     }
// }
function deleteChild(element) {
    let child = element.childNodes
    for (let i = child.length - 1; i >= 0; i--) {
        element.removeChild(child[i])
    }
}
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
// let data = sourceData.filter((item) => {
//     return item.product === '手机' && item.region === '华东'
// })
// let sale = [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
// tableBar.appendChild(bar(sale))