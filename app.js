const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// const { start } = require('repl');

app.use(bodyParser.urlencoded({ extended: false })); // these are middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('66448388d7a16a490b4c84ac')
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://mangal:mangalprasad@cluster0.xutnbhc.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then( result => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'Mangal',
                email: 'Mangal@email.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
    console.log('Connected !!')
})
.catch(err => console.log(err));

