const express = require('express');
const app = express();

require('./startup/database.js')();
const lushVault = require('./startup/blockchain.js');
require('./startup/morgan.js')(app);
require('./startup/routes.js')(app);
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

// Default to port 3000 if none specified in the environment
const port = '3000';

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = {app};