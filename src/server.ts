import app from './';

const port = process.env.PORT || 3333; // Specify the desired port number

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
    process.exit(0);
  });
});