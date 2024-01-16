const Product = require('../Models/Product')



exports.read = async(req,res) => {
    try {
        // code
        const id = req.params.id
        const productID = await Product.find({_id:id}).exec();
        res.send(productID)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req,res) => {
    try {
        // code
        const productList = await Product.find({}).exec();
        res.send(productList)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.create = async (req,res) => {
    try {
        // code
        console.log(req.body)
        const producted = await Product(req.body).save()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req,res) => {
    try {
        const id = req.params.id
        const ProductUpdate = await Product.findOneAndUpdate({ _id:id }, req.body, { new: true}).exec()
        res.send(ProductUpdate)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.remove = async (req,res) => {
    try {
        const id = req.params.id
        const deleteProduct = await Product.findOneAndDelete({_id:id}).exec()
        res.send(deleteProduct)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

