const app = require('./app');

const port = process.env.PORT || 5050;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://localhost:${port}`);
});
