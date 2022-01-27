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
            const [results] =  await connection.query('delete from categories where id = ? limit 1', [3])
            console.log(results)
            
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.log(error)
    }

}

run()