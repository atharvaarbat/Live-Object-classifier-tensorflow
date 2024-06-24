export function drawRect (objects, ctx) {
    objects.forEach(object => {
        const [x, y, width, height] = object['bbox'];
        const text = object['class']
        ctx.beginPath();
        ctx.fillText(text, x, y)
        ctx.strokeStyle = 'red';
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeRect(x, y, width, height);
        ctx.lineWidth = 4;
        ctx.font = '24px Arial';
        ctx.rect(x, y, width, height);
        ctx.stroke();
    })
}