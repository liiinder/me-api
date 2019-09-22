var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    const data = {
        data: {
            msg: "Hello test page!"
        }
    };
    
    res.json(data);
});

router.get('/:msg', function (req, res, next) {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});

module.exports = router;