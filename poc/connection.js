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
            const [results, fields] =  await connection.query('select * from categories')
            console.log(results, fields)
            
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.log(error)
    }

}

run()