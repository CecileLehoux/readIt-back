const ratingRouter = require('express').Router();
const Rating = require('../models/Rating');

ratingRouter.get('/', (req, res) => {
  Rating.findMany()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving Ratings from database');
    });
});

ratingRouter.get('/:id', (req, res) => {
  Rating.findOne(req.params.id)
    .then((track) => {
      if (track) res.json(track).status(201);
      else res.status(404).send('Rating not found');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving Rating from database');
    });
});

ratingRouter.post('/', (req, res) => {
  Rating.create(req.body)
    .then((createdMovie) => {
      res.status(201).json(createdMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the Rating');
    });
});

ratingRouter.put('/:id', (req, res) => {
  let existingRating = null;
  Rating.findOne(req.params.id)
    .then((track) => {
      existingTrack = track;
      if (!existingRating) return Promise.reject('RECORD_NOT_FOUND');
    })
    .then(() => {
      res.status(204).json({ ...existingRating, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`Rating with id ${req.params.id} not found.`);
      else res.status(500).send('Error updating a movie.');
    });
});

ratingRouter.delete('/:id', (req, res) => {
  Rating.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(204).send('🎉 Rating deleted!');
      else res.status(404).send('Rating not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a Rating');
    });
});

module.exports = ratingRouter;
