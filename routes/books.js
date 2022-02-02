const bookRouter = require('express').Router();
const Book = require('../models/book');

bookRouter.get('/', (req, res) => {
  Book.findMany()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving users from database');
    });
});

bookRouter.get('/:id', (req, res) => {
  Book.findOne(req.params.id)
    .then((track) => {
      if (track) res.json(track).status(201);
      else res.status(404).send('Book not found');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving book from database');
    });
});

bookRouter.get('/:id/tracks', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Book.findTracks(id);
    if (result && result.length === 0) {
      res.status(404).send('Error books not found');
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving book from database');
  }
});

bookRouter.post('/', (req, res) => {
  Book.create(req.body)
    .then((createdMovie) => {
      res.status(201).json(createdMovie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the book');
    });
});

bookRouter.put('/:id', (req, res) => {
  let existingBook = null;
  Book.findOne(req.params.id)
    .then((track) => {
      existingTrack = track;
      if (!existingBook) return Promise.reject('RECORD_NOT_FOUND');
    })
    .then(() => {
      res.status(204).json({ ...existingBook, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`book with id ${req.params.id} not found.`);
      else res.status(500).send('Error updating a movie.');
    });
});

bookRouter.delete('/:id', (req, res) => {
  Book.destroy(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(204).send('🎉 Book deleted!');
      else res.status(404).send('Book not found');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting a book');
    });
});

module.exports = bookRouter;
