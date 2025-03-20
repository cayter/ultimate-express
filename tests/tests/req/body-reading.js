// must support body reading

const express = require("express");
const { PassThrough } = require("stream");

const app = express();

app.post("/test", (req, res) => {
    const body = new PassThrough();
    req.pipe(body);
    let i = 0;
    let total = 0;
    let data = '';
    body.on('data', (chunk) => {
        i++;
        total += chunk.length;
        data += chunk.toString();
    });
    body.on('finish', () => {
        console.log('finish', total, data.length, i);
        console.log(data);
        res.send('ok');
    });
});

app.listen(13333, async () => {
    console.log('Server is running on port 13333');
    let body = '';
    for(let i = 0; i < 100000; i++) {
        body += `${i} `;
    }

    let res;
    res = await fetch('http://localhost:13333/test', {
        method: 'POST',
        body: body,
    });
    console.log(await res.text());

    setTimeout(() => {
        process.exit(0);
    }, 1000);
})
