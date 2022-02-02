const connection = require('../db-config');
const db = connection.promise();

const findMany = () => {
  const sql = 'SELECT * FROM Rating';
  const sqlValues = [];
  return db.query(sql, sqlValues).then(([results]) => results);
};

const findOne = (id) => {
  return db
    .query('SELECT * FROM Rating WHERE id = ?', [id])
    .then(([results]) => results[0]);
};


const create = ({ rating, comment}) => {
  return db
    .query(
      'INSERT INTO Rating (rating, comment) VALUES (?, ?)',
      [rating, comment]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { rating, comment};
    });
};

const update = (id, newAttributes) => {
  return db.query('UPDATE Rating SET ? WHERE id = ?', [newAttributes, id]);
};

const destroy = (id) => {
  return db
    .query('DELETE FROM Rating WHERE id = ?', [id])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = { findMany, findOne, create, update, destroy };
