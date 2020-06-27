const clarifai = require('clarifai');

const app = new clarifai.App({
    apiKey: '4ea4832839fa4e8ba507c6420d5708a0'
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json('could not communicate with API')
    });
}

const getImageCount = (req, res, db) => {
    const { id } = req.body;
    db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries...'));
}

module.exports = {
    getImageCount,
    handleApiCall
}