const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample Products Data
const products = [
    {
        id: 1,
        name: 'تغییر عکس به لاغرتر',
        nameEn: 'AI Weight Loss Photo',
        description: 'عکس خود را آپلود کنید و نسخه لاغرتر آن را با هوش مصنوعی دریافت کنید',
        price: 50000,
        category: 'photo-editing',
        image: '/images/weight-loss.jpg',
        popular: true
    },
    {
        id: 2,
        name: 'عکس با بازیگران مشهور',
        nameEn: 'Photo with Celebrities',
        description: 'عکس خود را در کنار بازیگران مورد علاقه‌تان ببینید',
        price: 75000,
        category: 'photo-editing',
        image: '/images/celebrity.jpg',
        popular: true
    },
    {
        id: 3,
        name: 'ساخت پرتره حرفه‌ای',
        nameEn: 'Professional Portrait',
        description: 'تبدیل عکس معمولی به پرتره حرفه‌ای استودیویی',
        price: 60000,
        category: 'portrait',
        image: '/images/portrait.jpg',
        popular: true
    },
    {
        id: 4,
        name: 'جوانسازی چهره',
        nameEn: 'Face Rejuvenation',
        description: 'چهره خود را جوانتر و شادابتر نشان دهید',
        price: 55000,
        category: 'photo-editing',
        image: '/images/rejuvenation.jpg',
        popular: false
    },
    {
        id: 5,
        name: 'تغییر استایل مو',
        nameEn: 'Hairstyle Change',
        description: 'مدل موی جدید را قبل از تغییر واقعی امتحان کنید',
        price: 45000,
        category: 'beauty',
        image: '/images/hairstyle.jpg',
        popular: false
    },
    {
        id: 6,
        name: 'افزایش قد در عکس',
        nameEn: 'Height Enhancement',
        description: 'در عکس‌های خود بلندقدتر به نظر برسید',
        price: 40000,
        category: 'photo-editing',
        image: '/images/height.jpg',
        popular: false
    },
    {
        id: 7,
        name: 'تغییر رنگ چشم',
        nameEn: 'Eye Color Change',
        description: 'رنگ چشم‌های خود را به صورت طبیعی تغییر دهید',
        price: 35000,
        category: 'beauty',
        image: '/images/eye-color.jpg',
        popular: false
    },
    {
        id: 8,
        name: 'پاکسازی پوست',
        nameEn: 'Skin Cleaning',
        description: 'حذف جوش، لک و نواقص پوست با هوش مصنوعی',
        price: 50000,
        category: 'beauty',
        image: '/images/skin.jpg',
        popular: true
    }
];

// Shopping Cart (in-memory storage)
let cart = [];
let orders = [];

// Routes
app.get('/', (req, res) => {
    const featuredProducts = products.filter(p => p.popular);
    res.render('index', {
        products: featuredProducts,
        cartCount: cart.length,
        page: 'home'
    });
});

app.get('/products', (req, res) => {
    const category = req.query.category || 'all';
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    res.render('products', {
        products: filteredProducts,
        currentCategory: category,
        cartCount: cart.length,
        page: 'products'
    });
});

app.get('/product/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).render('error', { message: 'محصول یافت نشد' });
    }
    res.render('product-detail', {
        product,
        cartCount: cart.length,
        page: 'products'
    });
});

app.post('/cart/add', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === parseInt(productId));
    
    if (!product) {
        return res.status(404).json({ success: false, message: 'محصول یافت نشد' });
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += parseInt(quantity) || 1;
    } else {
        cart.push({ ...product, quantity: parseInt(quantity) || 1 });
    }
    
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        res.json({ success: true, cartCount: cart.length });
    } else {
        res.redirect('/cart');
    }
});

app.get('/cart', (req, res) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.render('cart', {
        cartItems: cart,
        total,
        cartCount: cart.length,
        page: 'cart'
    });
});

app.post('/cart/remove/:id', (req, res) => {
    cart = cart.filter(item => item.id !== parseInt(req.params.id));
    res.redirect('/cart');
});

app.post('/cart/update/:id', (req, res) => {
    const { quantity } = req.body;
    const item = cart.find(item => item.id === parseInt(req.params.id));
    
    if (item) {
        if (parseInt(quantity) > 0) {
            item.quantity = parseInt(quantity);
        } else {
            cart = cart.filter(i => i.id !== item.id);
        }
    }
    
    res.redirect('/cart');
});

app.get('/checkout', (req, res) => {
    if (cart.length === 0) {
        return res.redirect('/products');
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.render('checkout', {
        cartItems: cart,
        total,
        cartCount: cart.length,
        page: 'checkout'
    });
});

app.post('/checkout', (req, res) => {
    const { name, email, phone, address } = req.body;
    
    if (!name || !email || !phone || !address) {
        return res.render('checkout', {
            cartItems: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            error: 'لطفاً تمام فیلدها را پر کنید',
            cartCount: cart.length,
            page: 'checkout'
        });
    }
    
    const order = {
        id: Date.now(),
        items: [...cart],
        customer: { name, email, phone, address },
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date(),
        status: 'pending'
    };
    
    orders.push(order);
    cart = [];
    
    res.render('order-success', {
        order,
        cartCount: 0,
        page: 'checkout'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        cartCount: cart.length,
        page: 'about'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        cartCount: cart.length,
        page: 'contact'
    });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Here you would typically save to database or send email
    res.render('contact', {
        success: 'پیام شما با موفقیت ارسال شد',
        cartCount: cart.length,
        page: 'contact'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
