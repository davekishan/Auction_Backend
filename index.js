const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const url = 'mongodb+srv://kishancoc99:CH151sRd5btJSCCj@auction.wnk2nws.mongodb.net/Auction';
const productmodel = require('./module');
const myproduct = require('./myproduct');
app.set('view engine', 'ejs');
const cors = require('cors');
const pinataSDK = require('@pinata/sdk');
const mongoose = require('mongoose');
const fs = require('fs');
const fileUpload = require('express-fileupload');


const expressjson = express.json();
app.use(cors({
    origin: '*'
}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})
app.use('/public', express.static(path.join(__dirname, 'public')))

const pinata = new pinataSDK('90469d3ebd81dbd5829a', 'ec433e45fe70be821a0088fbee129363598a06712a09bc538820da1a12e7b510');

app.use(fileUpload());

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.render(path.resolve(__dirname + "/views/addproduct.ejs"), { success: "" });
})

app.post('/imageupload', expressjson, async (req, res) => {


    try {

        const imageUpload = req?.files?.image;
        console.log("image is : " + imageUpload)
        await imageUpload.mv(path.join('public', 'uploads', imageUpload.name))
        const readFile = fs.createReadStream(path.join('public', 'uploads', imageUpload.name));
        console.log("path is : " + path.join('public', 'uploads', imageUpload.name))
        const options = {
            pinataMetadata: {
                name: imageUpload.name,
            }
        }
        pinata.pinFileToIPFS(readFile, options).then((result) => {
            console.log(result)
            res.json({ response: 'https://ipfs.io/ipfs/' + result.IpfsHash })
        }).catch((err) => {
            console.log(err)
            res.json({ response: 'image not uploaded' })

        })
    } catch (error) {
        res.json({ response: "image not selected" })
    }
    // const {tokenid} = req.body;
    // const {image}=req.files;
    // // console.log(image)
    // res.json({response:image})
})

app.post('/product', urlencodedParser, expressjson, async (req, res) => {
    const time = new Date()
    const { tokenid, name, description, amount, account, price, uri, isToken, timeline } = req.body;
    console.log("account is: " + account)
    const checkUserExists = await productmodel.find({ "tokenid": tokenid })
    if (checkUserExists.length !== 0) {
        res.send('Token Id Is Already Use')
    } else {

        const user = new productmodel({ productid: tokenid, tokenid: tokenid, name: name, description: description, account: account, amount: amount, price: price, uri: uri, saletype: isToken, timeline: timeline, date: time })

        user.save().catch((err) => console.log(err)).then(() => res.json({ message: 'Product Added', product: user }))

    }

})

app.get('/getproduct', async (req, res) => {
    const time = new Date().getTime();
    const users = await productmodel.find({ sold: false, $or: [{ saletype: '0', timeline: { $gt: time } }, { saletype: '1' }] })
    // , timeline: {$gt: time || saletype:'1'} 
    res.json({ product: users })
})


app.get('/buyproduct/:tokenid', async (req, res) => {

    const product = await productmodel.findOne({ tokenid: req.params.tokenid })
    res.render(path.resolve(__dirname + "/views/buy.ejs"), { 'user': product });
})

app.get('/bidproduct/:tokenid', async (req, res) => {

    const product = await productmodel.findOne({ tokenid: req.params.tokenid })
    res.json({ product: product })
    // res.render(path.resolve(__dirname + "/views/bid.ejs"), { 'tokenid': product.tokenid, 'lastbiding': product.lastbiding });
})


app.post('/biding', urlencodedParser, expressjson, async (req, res) => {
    const { tokenid, bidvalue, bidaccount } = req.body;

    const product = await productmodel.findOne({ tokenid: tokenid })

    if (product.lastbiding <= bidvalue) {
        product.bidaccount = bidaccount;
        product.lastbiding = bidvalue;

        product.save().catch((err) => console.log(err)).then(() => res.json({ message: 'Product Added', product: product }))

    }
    else {
        console.log("data Not Saved")
    }
})

app.post('/buying', urlencodedParser, expressjson, async (req, res) => {
    const { tokenid, account } = req.body;
    const product = await productmodel.findOne({ tokenid: tokenid })
    const time = new Date()

    if (product.account != account) {

        const product1 = new myproduct({ productid: tokenid, tokenid: tokenid, name: product.name, description: product.description, price: product.price, account: account, creator: product.account, amount: product.amount, uri: product.uri, date: product.date, buy_at: time })
        product.sold = true;
        product.account = account;
        product.save()
        product1.save().catch((err) => console.log(err)).then(() => res.json({ message: 'Product Buy', 'product': product }))
    }
    else {
        console.log("Owner Can Not Buy")
    }

})
app.get('/claim/:account', urlencodedParser, async (req, res) => {

    const product = await productmodel.find({ bidaccount: req.params.account, sold: false })

    if (product) {
        res.json({ product: product })
    }
    else {
        console.log("Product is not found")
    }

})

app.get('/searchclaim', async (req, res) => {
    res.render(path.resolve(__dirname + "/views/search.ejs"));
})

app.get('/gettoken/:account', urlencodedParser, expressjson, async (req, res) => {

    const product = await myproduct.find({ account: req.params.account })
    res.json({ product: product })
    // res.render(path.resolve(__dirname + "/views/mytoken.ejs"), { 'product': product });
})


app.post('/claimbid', async (req, res) => {
    const { tokenid, account } = req.body;
    const time = new Date()
    const product = await productmodel.findOne({ tokenid: tokenid })

    if (product.account != account) {
        const product1 = new myproduct({ productid: tokenid, tokenid: tokenid, description: product.description, price: product.lastbiding, account: account, creator: product.account, amount: product.amount, uri: product.uri, date: product.date, buy_at: time })
        product.sold = true;
        product.save();
        product1.save().catch((err) => console.log(err)).then(() => res.json({ message: 'Product Buy', product: product }))
    }
    else {
        console.log("You Are Owner")
    }
})


app.listen(3000, (err) => {
    mongoose.connect(url, function (err, result) {
        if (err) throw err

        database = result
        console.log('port 3000')
    })
})

