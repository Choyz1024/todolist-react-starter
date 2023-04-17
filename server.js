const { v4: uuidv4 } = require('uuid');
const jsonServer = require('json-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const SECRET_KEY = 'mySecretKey';
const PORT = 8000;

server.use(jsonServer.bodyParser);
server.use(middlewares);

// 註冊API
server.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;
  // 檢查帳號是否已存在
  const user = router.db.get('users').find({ username }).value();
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: 'Username already exists' });
  }

  // 密碼加密
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error hashing password' });
    }
    // 新增使用者
    const id = uuidv4();
    router.db
      .get('users')
      .push({ id, username, email, password: hash })
      .write();

    // 發送 token
    const token = jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ authToken: token });
  });
});

// 登入API
server.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // 檢查帳號是否存在
  const user = router.db.get('users').find({ username }).value();
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: 'Username not found' });
  }

  // 檢查密碼是否正確
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid password' });
    }

    // 發送 token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ authToken: token, user: { username, email: user.email } });
  });
});

// 驗證Token的API
server.get('/api/auth/test-token', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, error: 'Authorization header not found' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: 'Token not found' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, error: 'Invalid token' });
    }

    res.json({ success: true, error: null });
  });
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}/`);
});
