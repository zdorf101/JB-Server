const express = require('express');
const postsRouter = require('./posts');
const apiRouter = express.Router();

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter)

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;
async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `, [username]);

        return user;
    } catch (error) {
        throw error;
    }
}

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { 
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});

module.exports = apiRouter;
module.exports = usersRouter;
module.exports = postsRouter;
module.exports = usersRouter;
module.exports = getUserByUsername;


apiRouter.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    });
});
apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }

    next();
});


module.exports = apiRouter;