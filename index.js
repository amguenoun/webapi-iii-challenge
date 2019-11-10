// code away!
const server = require('./server');

const userRouter = require('./users/userRouter');

server.use('/users', userRouter);

server.listen(5000, () => {
    console.log('Server is listening on port 5000');
})