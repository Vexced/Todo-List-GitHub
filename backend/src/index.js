const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const todosRouter = require('./routes/todos');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/todos', todosRouter);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
