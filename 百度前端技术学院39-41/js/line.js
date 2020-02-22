let line = {
    data: [],
    chart() {
        let canvas = document.createElement('canvas')
        let dataMax = []
        this.data.forEach((item) => {
            dataMax.push(Math.max.apply(null, item))
        })
        //每条数据中的最大值
        let max = Math.max.apply(null, dataMax)
        //所有数据中的最大值
        let lineWidth = 45
        //每个数据点所占的位置
        let canvasWidth = (this.data[0].length * lineWidth)
        //计算画板的宽度
        canvas.setAttribute('width', canvasWidth)
        canvas.setAttribute('height', 250)
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = `rgb(0,0,0)`
        for (let j = 0; j < this.data.length; j++) {
            ctx.beginPath()
            ctx.moveTo(3.5, 0)
            ctx.lineTo(3.5, 250 - 0.5)
            ctx.lineTo(canvasWidth, 250 - 0.5)
            ctx.stroke()
            //绘制坐标轴
            ctx.beginPath()
            ctx.strokeStyle = `rgb(${Math.floor(255 - 85 * j)},${Math.floor(255 - (255 - 17 * j))},${Math.floor(255 - 15 * j)})`
            ctx.moveTo(3.5, 250 - (this.data[j][0] / max * 200))
            //起点是每条数据的第一个数据
            for (let i = 1; i < this.data[j].length; i++) {
                ctx.lineTo(3.5 + lineWidth * i, 250 - (this.data[j][i] / max * 200))
            }
            //循环画出后面的数据
            ctx.stroke()
            //折线绘制完成
            ctx.beginPath()
            ctx.fillStyle = `rgb(255,255,255)`
            ctx.strokeStyle = `rgb(${Math.floor(255 - 85 * j)},${Math.floor(255 - (255 - 17 * j))},${Math.floor(255 - 15 * j)})`
            for (let i = 0; i < this.data[j].length; i++) {
                ctx.moveTo(3.5 + (lineWidth * i) + 3, 250 - (this.data[j][i] / max * 200))
                ctx.arc(3.5 + lineWidth * i, 250 - (this.data[j][i] / max * 200), 3, 0, Math.PI * 2, true)
            }
            //绘制数据点上的小圆点
            ctx.fill()
            ctx.stroke()

        }
        return canvas
    },
    setData(...data) {
        this.data = data
        return this.chart()
    }
}