const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Polylang-style `lang` filter. Accepts `en`, `fr`, `zh` and regional codes
// such as `zh-TW` (compared on the primary subtag only).
function filterByLang(items, lang) {
  if (!lang) {
    return items;
  }
  const primary = (code) => String(code).toLowerCase().split('-')[0];
  return items.filter((item) => primary(item.lang) === primary(lang));
}

server.get('/wp-json/wp/v2/posts', (req, res) => {
  const db = router.db;
  let items = filterByLang(db.get('posts').value(), req.query.lang);
  if (req.query.slug) {
    items = items.filter((item) => item.slug === req.query.slug);
  }
  res.jsonp(items);
});

// destinations
server.get('/wp-json/wp/v2/destinations', (req, res) => {
  const db = router.db;
  let items = filterByLang(db.get('destinations').value(), req.query.lang);
  if (req.query.slug) {
    items = items.filter((item) => item.slug === req.query.slug);
  }
  res.jsonp(items);
});

//media
server.get('/wp-json/wp/v2/media/:id', (req, res) => {
  const db = router.db;
  let items = db
    .get('media')
    .find({ id: parseInt(req.params.id) })
    .value();
  if (!items) {
    return res.status(404).jsonp({ error: 'Not found' });
  }
  res.jsonp(items);
});

// pages
server.get('/wp-json/wp/v2/pages', (req, res) => {
  const db = router.db;
  let items = filterByLang(db.get('pages').value(), req.query.lang);
  if (req.query.slug) {
    items = items.filter((item) => item.slug === req.query.slug);
  }
  if (req.query.template) {
    items = items.filter((item) => item.template === req.query.template);
  }
  res.jsonp(items);
});

// contact api
server.post('/wp-json/wp/v2/contact', (req, res) => {
  const db = router.db;
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    source: req.body.source,
    timestamp: Date.now(),
  };

  db.get('contacts').push(newContact).write();

  res.jsonp({ success: true, message: 'Message sent successfully' });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
