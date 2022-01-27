const db = require('./db')
const categories = require('./categories')(db)
const products = require('./products')(db)

const test = async() => {

    //await categories.create(['New categories from api'])
    //await categories.remove(4)
    //await categories.update(2, ['Limpeza'])
    //const cats = await categories.findAll()
    //console.log(cats)
    //await products.addImage(2, ['mesa gamer', 'url'])
    //const prods = await products.findAllByCategory(2)
    const prods = await products.findAllPaginated()
    console.log(prods)
}

test()