const db = require('../database/dbConfig');

module.exports = {
    getUsers,
    addUser,
    removeUser,
    getUserBy
}

function getUsers() {
    return db('users');
}

async function addUser(user) {
    const [id] = await db('users').insert(user);
    return getUserBy({id});
}

function removeUser(id) {

}

function getUserBy(filter) {
    return db('users').select('id', 'username', 'password')
        .where(filter)
}