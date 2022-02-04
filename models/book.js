const connection = require('../db-config');
const db = connection.promise();

const findMany = () => {
  const sql = 'SELECT * FROM Book';
  const sqlValues = [];
  return db.query(sql, sqlValues).then(([results]) => results);
};

const findOne = (id) => {
  return db
    .query('SELECT * FROM Book WHERE id = ?', [id])
    .then(([results]) => results[0]);
};

const findOneComment = (id) => {
  return db
  .query('SELECT Rating.* FROM Rating JOIN Book ON Rating.id = Book.Rating_id WHERE Book.id = ?', [id])
  .then(([results]) => results[0]);
}

const create = ({ name, type, image, pages, description, author }) => {
  return db
    .query(
      'INSERT INTO Book (name, type, image, pages, description, author) VALUES (?, ?, ?, ?, ?, ?)',
      [name, type, image, pages, description, author]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { name, type, image, pages, description, author };
    });
};

const update = (id, newAttributes) => {
  return db.query('UPDATE Book SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM Book WHERE id = ?', [id])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = { findMany, findOne, findOneComment, create, update, destroy };
