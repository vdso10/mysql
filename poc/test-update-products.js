const mysql = require('mysql2/promise')


const run = async() => {

    try {

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'senha',
            database: 'cat_products'
        })
    
        try {
            const [results, fields] =  await connection.query('update products set product = ?, price = ? where id = ? ', ['Mesa Gamer', '699', 2])
            console.log(results, fields)
            
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.log(error)
    }

}

run()