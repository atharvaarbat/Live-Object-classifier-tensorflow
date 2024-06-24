export function drawRect (objects, ctx) {
    objects.forEach(object => {
        const [x, y, width, height] = object['bbox'];
        const text = object['class']
        ctx.beginPath();
        ctx.fillText(text, x, y)
        //ctx.strokeStyle = "#" + Math.floor(Math.random()*16777215).toString(16);
        ctx.font = '18px Arial';
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.strokeStyle = 'red';
    })
}