const express = require('express');
const { NmapScan } = require('node-nmap');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/scan', (req, res) => {
    const nmap = new NmapScan('192.168.1.0/24'); // Adjust the IP range as needed

    nmap.on('complete', (data) => {
        res.json(data);
    });

    nmap.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });

    nmap.startScan();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
