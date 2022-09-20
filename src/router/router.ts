import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../schemas/user.model";
import {ProductModel} from "../schemas/product.model";
import {auth} from "../middleware/auth";

const router = express.Router();
const upload = multer();

router.use('/product', upload.none(), auth);

router.get('/user/login', async (req, res) => {
    res.render('login');
})

router.get('/home', async (req, res) => {
    res.render('home');
})

router.get('/list', async (req, res) => {
    const products = await ProductModel.find();
    res.render('list', {products:products});
})

router.get('/create', async (req, res) => {
    res.render('create');
})

router.post('/user/register', async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (!user) {
            const passwordHash = await bcrypt.hash(req.body.password, 5);
            let userData = {
                username: req.body.username,
                role: req.body.role,
                password: passwordHash
            }
            const newUser = await UserModel.create(userData);
            res.json({user: newUser, code:200});
        } else {
            res.json({err: 'User existed'})
        }
    } catch (err) {
        res.json({err: err});
    }
})

router.post('/user/login', upload.none(), async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username});
        if (user) {
            const comparePass = await bcrypt.compare(req.body.password, user.password);
            if (!comparePass) {
                return Promise.reject({
                    code: 404,
                    message: 'Password_not_valid',
                })
            }
            let payload = {
                user_id: user["id"],
                username: user["username"],
                role: user["role"]
            }
            const token = jwt.sign(payload, '123456789', {expiresIn: 36000});
            res.render('home', {token: token})
        } else {
            return res.json({err: 'sai tk hoac mat khau'})
        }
    } catch (err) {
        return res.json({err: err})
    }
})

router.post('/product/create', async (req: any, res) => {
    try {
        const user = req.decoded;
        if (user.role !== 'admin') {
            res.render('error');
            return;
        }
        const product = await ProductModel.findOne({name: req.body.name});
        if (!product) {
            let productData = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category
            }
            const productNew = await ProductModel.create(productData);
            res.render('success')
        } else {
            res.json({err: 'Product existed'})
        }
    } catch (err) {
        res.json({err: err})
    }
})

export default router;