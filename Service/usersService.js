const dataSource = require('../Datasource/MySQLMngr');
const hashService = require('./hashPassword');
require('dotenv').config();
/** 
 * @returns
 */
async function getUsers(){
    let qResult;
    try{
        let query = "SELECT * FROM usuario";
        qResult = await dataSource.getData(query);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}

/**
 * @param {int} idUsuario
 * @returns
 */
async function findUser(idUsuario){
    let qResult;
    try{
        let query = "SELECT * FROM usuario WHERE idUsuario = ?";
        let params = [idUsuario]
        qResult = await dataSource.getDataWithParams(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false,[],0,0,err.message);
    }
    return qResult;
}

/**
 * @param {*} user
 * @returns
 */
async function insertUser(user){
    let qResult;
    try{
        let query = "INSERT INTO usuario (Nombre, Apellidos, email, password, pais, numerotel, region, ciudad, nombreOrganizacion, descOrganizacion, rol, estado, idResponsable) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const salt = hashService.getSalt();
        const hash = await hashService.encryptPassword(user.password, salt);
        const hash_password = salt + hash;
        let params = [
            user.Nombre,
            user.Apellidos,
            user.email,
            hash_password, 
            user.pais,
            user.numerotel,
            user.region,
            user.ciudad,
            user.nombreOrganizacion,
            user.descOrganizacion,
            user.rol,
            user.estado,
            user.idResponsable
        ];
        qResult = await dataSource.getDataWithParams(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}

/**
 * @param {*} user
 * @returns
 */
async function updateUser(user){
    let qResult;
    try{
        let query = "UPDATE usuario SET name = ?, username = ?, password = ?, age = ?, hash_password = ? WHERE id = ?";
        user.hash_password = await hashService.encryptPassword(user.password);
        let params = [user.name, user.username, user.password, user.age, user.hash_password, user.id];
        qResult = await dataSource.updateData(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}
/**
 * @param {int} user_id
 * @returns
 */
async function deleteUser(user_id){
    let qResult;
    try{
        let query = "DELETE FROM usuario WHERE id = ?";
        let params = [user_id];
        qResult = await dataSource.deleteUser(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0, 0, err.message);
    }
    return qResult;
}

module.exports = {
    getUsers,
    findUser,
    insertUser,
    updateUser,
    deleteUser
}