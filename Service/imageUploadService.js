const dataSource = require('../Datasource/MySQLMngr');

/**
 * @param {*} image
 * @returns
 */
async function uploadedImageLog(image){
    let qResult;
    try{
        let query = 'INSERT INTO imagenes (name, usuario_carga) VALUES (?,?)';
        let params = [image.name, image.usuario_carga];
        qResult = await dataSource.insertData(query, params);
    }catch(err){
        qResult = new dataSource.QueryResult(false, [], 0,0, err.message);
    }
    return qResult;
}

module.exports = {uploadedImageLog};