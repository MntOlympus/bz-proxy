const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/api/properties', (req, res) => {
    proxy.web(req, res, {
        target: "http://ec2-13-59-243-8.us-east-2.compute.amazonaws.com/"
      });
} )

app.all('/images*', (req, res) => {
    proxy.web(req, res, {
        target: "http://ec2-13-59-243-8.us-east-2.compute.amazonaws.com/"
      });
} )


app.all('/api/listing', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3500"
      });
} )

app.all('/api/reviews', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3500"
      });
} )

app.all('/recommendations', (req, res) => {
    proxy.web(req, res, {
        target: "http://ec2-3-89-251-90.compute-1.amazonaws.com:3009/"
      });
} )

app.all('/photos', (req, res) => {
    proxy.web(req, res, {
        target: "http://localhost:3001"
      });
} )


app.listen(port, () => console.log(`Proxy server running on port ${port}`));