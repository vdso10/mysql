const init = connection => {
    const create = async(data) => {

        const conn = await connection
        await conn.query('insert into products (product, price) values (?, ?)', data)
    }

    const remove = async(id) => {
        
        const conn = await connection
        await conn.query('delete from products where id = ? limit 1', [id])
    }

    const update = async(id, data) => {
        
        const conn = await connection
        await conn.query('update products set product = ?, price = ? where id = ? ', [...data, id])
    }

    const findImages = async(results) => {
        
        const conn = await connection

        const productsId = results.map(product => product.id).join(',')

        const [images] = await conn.query('select * from images where product_id in('+ productsId + ') group by product_id')

        const mapImages = images.reduce((anterior, atual) => {
            return{
                ...anterior,
                [atual.product_id]: atual
            }
        }, {})

        const products = results.map(product => {
            return{
                ...product, 
                images: mapImages[product.id]
            }
        })

        return products

    }

    const findAll = async() => {
        
        const conn = await connection
        const [results] = await conn.query('select * from products')
                
        return findImages(results)
    }

    const findAllPaginated = async({pageSize = 10, currentPage = 0} = {}) => {
        
        const conn = await connection
        const [results] = await conn.query(`select * from products limit ${currentPage*pageSize}, ${pageSize+1}`)
        const hasNext = results.length > pageSize

        if(results.length > pageSize){
            results.pop()
        }

        const resultsWithImages = await findImages(results)

        return{
            data: resultsWithImages,
            hasNext
        }

    }

    const findAllByCategory = async(categoryId) => {
        
        const conn = await connection
        const [results] = await conn.query('select * from products where id in (select product_id from categories_products where category_id = ?)', [categoryId])
                
        return findImages(results)
    }

    const addImage = async(productId, data) => {
        
        const conn = await connection
        await conn.query('insert into images (product_id, description, url) values (?, ?, ?)', [productId,...data])
    }

    const updateCategories = async(productId, categoryIds) => {
        
        const conn = await connection
        await conn.query('update products set product = ?, price = ? where id = ? ', [...data, id])
    }

    return{
        create,
        remove,
        update,
        findAll,
        findAllByCategory,
        findAllPaginated,
        addImage        
    }
}

module.exports = init