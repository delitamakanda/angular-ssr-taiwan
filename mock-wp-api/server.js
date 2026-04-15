const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/wp-json/wp/v2/posts', (req, res) => {
  const db = router.db;
  let items = db.get('posts').value();
  if (ref.query.slug) {
    items = items.filter(item => item.slug === req.query.slug);
  }
  res.jsonp(items);
})

// destinations
server.get('/wp-json/wp/v2/destinations', (req, res) => {
  const db = router.db;
  let items = db.get('destinations').value();
  if (req.query.slug) {
    items = items.filter(item => item.slug === req.query.slug);
  }
  res.jsonp(items);
})

//media
server.get('/wp-json/wp/v2/media/:id', (req, res) => {
  const db = router.db;
  let items = db.get('media').find({ id: parseInt(req.params.id) }).value();
  if(!items) {
    return res.status(404).jsonp({ error: 'Not found' });
  }
  res.jsonp(items);
})

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
