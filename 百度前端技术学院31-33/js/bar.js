function bar(data) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    let max = Math.max.apply(null, sale)
    let barWidth = 50
    let intervalWidth = 20
    let svgHeight = max * 1.3
    let svgWidth = (data.length * barWidth) + ((data.length - 1) * intervalWidth) + (intervalWidth * 2)
    svg.setAttribute('width', svgWidth / 2);
    svg.setAttribute('height', svgHeight / 2);
    svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`)
    g.setAttribute('style', 'fill:#666;stroke-width:2;')
    polyline.setAttribute('points', `0,0 0,${svgHeight} ${svgWidth},${svgHeight}`)
    polyline.setAttribute('style', 'fill:#fff;stroke:#666;stroke-width:2;');
    for (let i = 0; i < data.length; i++) {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rect.setAttribute('width', barWidth)
        rect.setAttribute('height', data[i])
        rect.setAttribute('x', intervalWidth + intervalWidth * i + barWidth * i)
        rect.setAttribute('y', svgHeight - data[i])
        g.appendChild(rect)
    }
    svg.appendChild(polyline)
    svg.appendChild(g)
    return svg
}