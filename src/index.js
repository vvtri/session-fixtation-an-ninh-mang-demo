const express = require('express');

const app = express();
app.use(express.json());

const sessionMap = new Map();
const accountMap = new Map();
accountMap.set('vic', 'vic1');
accountMap.set('john', 'john1');

app.get('/no-secure', (req, res) => {
  res.send('no-secure');
});

app.get('/secure', (req, res) => {
  const { session } = req.query;
  const username = sessionMap.get(session);

  if (!username) return res.sendStatus(401);

  res.json(`hello ${username}, you entered private page`);
});

app.post('/login', (req, res) => {
  const { session } = req.query;
  const { username, pass } = req.body;

  const account = accountMap.get(username);

  if (!account || account !== pass || !session)
    return res.status(401).send('Invalid Credentials');

  sessionMap.set(session, username);
  return res.send(`Hello ${username}, you have logged in`);
});

app.listen(3000, () => console.log('listen at 3000'));
