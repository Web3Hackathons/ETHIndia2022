const Test = require('../models/test.model');

//read
exports.test = async function (req, res) {
    // res.send('Greetings from the Test controller!');
    const data = await Test.find({})
    console.log("get data", data);
    res.json(data);
     
};

// post test
exports.postTest = async function(req, res){
    const data = req.body;
    console.log("data:", data);

    const response = await Test.create(data)

    res.json({status: 'ok'})
}