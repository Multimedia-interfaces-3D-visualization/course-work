import Express from "express";
import HttpProxy from "http-proxy";


const router = Express.Router();

const ML_HOST = "http://localhost:6000";

const proxy = HttpProxy.createProxyServer();

router.use('*', (req, res, next) => {
    proxy.web(req, res, {
        target: ML_HOST + req.originalUrl.replace("/api/v1/ml", ""),
        ignorePath: true
    }, next);
});

export default router;
