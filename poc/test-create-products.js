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
            const [results] =  await connection.query('insert into products (product, price) values (?, ?)', ['Mesa', '750'])
            await connection.query('insert into categories_products (product_id, category_id) values (?, ?)', [results.insertId, 2])
            console.log(results)
            
        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.log(error)
    }

}

run()