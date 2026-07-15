import { Hono } from 'hono';

const app = new Hono();

// داده‌های محصولات
const products = [
  {
    id: 1,
    title: "لاغر کردن با هوش مصنوعی",
    price: 99000,
    image: "https://via.placeholder.com/300x200?text=AI+Weight+Loss",
    category: "سلامتی",
    description: "تصویر شما را پس از لاغری با هوش مصنوعی شبیه‌سازی می‌کنیم."
  },
  {
    id: 2,
    title: "عکس با بازیگر مورد علاقه",
    price: 49000,
    image: "https://via.placeholder.com/300x200?text=Photo+with+Celebrity",
    category: "سرگرمی",
    description: "عکس خود را در کنار بازیگر محبوبتان ببینید!"
  },
  {
    id: 3,
    title: "پرتره حرفه‌ای",
    price: 75000,
    image: "https://via.placeholder.com/300x200?text=Professional+Portrait",
    category: "هنری",
    description: "تبدیل عکس معمولی به پرتره حرفه‌ای استودیویی"
  },
  {
    id: 4,
    title: "جوان‌سازی چهره",
    price: 55000,
    image: "https://via.placeholder.com/300x200?text=Rejuvenation",
    category: "سلامتی",
    description: "نمایش چهره شما در سنین جوانی با هوش مصنوعی"
  },
  {
    id: 5,
    title: "تغییر استایل مو",
    price: 39000,
    image: "https://via.placeholder.com/300x200?text=Hairstyle+Change",
    category: "زیبایی",
    description: "امتحان مدل‌های مختلف مو قبل از آرایشگاه"
  },
  {
    id: 6,
    title: "طراحی لوگو با AI",
    price: 120000,
    image: "https://via.placeholder.com/300x200?text=AI+Logo+Design",
    category: "کسب‌وکار",
    description: "طراحی لوگوی اختصاصی برای برند شما"
  },
  {
    id: 7,
    title: "رنگی کردن عکس قدیمی",
    price: 45000,
    image: "https://via.placeholder.com/300x200?text=Colorize+Old+Photos",
    category: "هنری",
    description: "احیای خاطرات با رنگی کردن عکس‌های سیاه و سفید"
  },
  {
    id: 8,
    title: "کارتون کردن چهره",
    price: 35000,
    image: "https://via.placeholder.com/300x200?text=Cartoon+Face",
    category: "سرگرمی",
    description: "تبدیل عکس شما به شخصیت کارتونی"
  }
];

// صفحه اصلی
app.get('/', (c) => {
  return c.html(`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>فروشگاه محصولات هوش مصنوعی</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }
    body { background: #f5f5f5; color: #333; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav-links { list-style: none; display: flex; gap: 20px; }
    .nav-links a { color: white; text-decoration: none; transition: opacity 0.3s; }
    .nav-links a:hover { opacity: 0.8; }
    .cart-icon { position: relative; cursor: pointer; }
    .cart-count { position: absolute; top: -8px; right: -8px; background: #ff4757; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }
    .hero { text-align: center; padding: 60px 20px; background: white; margin-bottom: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    .hero h1 { font-size: 2.5rem; margin-bottom: 15px; color: #667eea; }
    .hero p { font-size: 1.1rem; color: #666; max-width: 600px; margin: 0 auto; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px; }
    .product-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.3s, box-shadow 0.3s; }
    .product-card:hover { transform: translateY(-5px); box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
    .product-image { width: 100%; height: 200px; object-fit: cover; }
    .product-info { padding: 20px; }
    .product-category { color: #667eea; font-size: 0.9rem; margin-bottom: 8px; }
    .product-title { font-size: 1.2rem; margin-bottom: 10px; color: #333; }
    .product-description { color: #666; font-size: 0.9rem; margin-bottom: 15px; line-height: 1.5; }
    .product-price { font-size: 1.3rem; font-weight: bold; color: #2ed573; margin-bottom: 15px; }
    .add-to-cart { width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem; transition: opacity 0.3s; }
    .add-to-cart:hover { opacity: 0.9; }
    footer { background: #2c3e50; color: white; text-align: center; padding: 30px 0; margin-top: 50px; }
    .btn { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px; }
    @media (max-width: 768px) { .nav-links { display: none; } .hero h1 { font-size: 1.8rem; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">🤖 فروشگاه AI</div>
        <ul class="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/products">محصولات</a></li>
          <li><a href="/about">درباره ما</a></li>
          <li><a href="/contact">تماس با ما</a></li>
        </ul>
        <div class="cart-icon" onclick="location.href='/cart'">
          🛒
          <span class="cart-count" id="cartCount">0</span>
        </div>
      </nav>
    </div>
  </header>

  <div class="container">
    <section class="hero">
      <h1>محصولات شگفت‌انگیز هوش مصنوعی</h1>
      <p>تجربه‌ای نوین از تکنولوژی هوش مصنوعی برای بهبود زندگی و کسب‌وکار شما</p>
    </section>

    <h2 style="margin-bottom: 20px; color: #333;">جدیدترین محصولات</h2>
    <div class="products-grid">
      ${products.slice(0, 4).map(product => \`
        <div class="product-card">
          <img src="\${product.image}" alt="\${product.title}" class="product-image">
          <div class="product-info">
            <div class="product-category">\${product.category}</div>
            <h3 class="product-title">\${product.title}</h3>
            <p class="product-description">\${product.description}</p>
            <div class="product-price">\${product.price.toLocaleString()} تومان</div>
            <button class="add-to-cart" onclick="addToCart(\${product.id})">افزودن به سبد خرید</button>
          </div>
        </div>
      \`).join('')}
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="/products" class="btn" style="font-size: 1.1rem; padding: 15px 30px;">مشاهده همه محصولات →</a>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>© 1403 فروشگاه محصولات هوش مصنوعی. تمامی حقوق محفوظ است.</p>
    </div>
  </footer>

  <script>
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    function addToCart(productId) {
      if (!cart.find(item => item.id === productId)) {
        const product = \${JSON.stringify(products)};
        const selectedProduct = product.find(p => p.id === productId);
        cart.push({ ...selectedProduct, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        alert('محصول به سبد خرید اضافه شد!');
      } else {
        alert('این محصول قبلاً در سبد خرید شما وجود دارد.');
      }
    }
  </script>
</body>
</html>
  `);
});

// صفحه محصولات
app.get('/products', (c) => {
  return c.html(\`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>محصولات - فروشگاه AI</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }
    body { background: #f5f5f5; color: #333; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav-links { list-style: none; display: flex; gap: 20px; }
    .nav-links a { color: white; text-decoration: none; }
    .cart-icon { position: relative; cursor: pointer; }
    .cart-count { position: absolute; top: -8px; right: -8px; background: #ff4757; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }
    .page-title { text-align: center; padding: 40px 0; color: #333; }
    .filter-buttons { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
    .filter-btn { padding: 10px 20px; border: 2px solid #667eea; background: white; color: #667eea; border-radius: 25px; cursor: pointer; transition: all 0.3s; }
    .filter-btn.active, .filter-btn:hover { background: #667eea; color: white; }
    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px; }
    .product-card { background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.3s; }
    .product-card:hover { transform: translateY(-5px); }
    .product-image { width: 100%; height: 200px; object-fit: cover; }
    .product-info { padding: 20px; }
    .product-category { color: #667eea; font-size: 0.9rem; }
    .product-title { font-size: 1.2rem; margin: 10px 0; }
    .product-description { color: #666; font-size: 0.9rem; margin-bottom: 15px; }
    .product-price { font-size: 1.3rem; font-weight: bold; color: #2ed573; margin-bottom: 15px; }
    .add-to-cart { width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; }
    footer { background: #2c3e50; color: white; text-align: center; padding: 30px 0; margin-top: 50px; }
    @media (max-width: 768px) { .nav-links { display: none; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">🤖 فروشگاه AI</div>
        <ul class="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/products">محصولات</a></li>
          <li><a href="/about">درباره ما</a></li>
          <li><a href="/contact">تماس با ما</a></li>
        </ul>
        <div class="cart-icon" onclick="location.href='/cart'">
          🛒
          <span class="cart-count" id="cartCount">0</span>
        </div>
      </nav>
    </div>
  </header>

  <div class="container">
    <h1 class="page-title">همه محصولات</h1>
    
    <div class="filter-buttons">
      <button class="filter-btn active" data-category="all">همه</button>
      <button class="filter-btn" data-category="سلامتی">سلامتی</button>
      <button class="filter-btn" data-category="سرگرمی">سرگرمی</button>
      <button class="filter-btn" data-category="هنری">هنری</button>
      <button class="filter-btn" data-category="زیبایی">زیبایی</button>
      <button class="filter-btn" data-category="کسب‌وکار">کسب‌وکار</button>
    </div>

    <div class="products-grid" id="productsGrid">
      \${products.map(product => \`
        <div class="product-card" data-category="\${product.category}">
          <img src="\${product.image}" alt="\${product.title}" class="product-image">
          <div class="product-info">
            <div class="product-category">\${product.category}</div>
            <h3 class="product-title">\${product.title}</h3>
            <p class="product-description">\${product.description}</p>
            <div class="product-price">\${product.price.toLocaleString()} تومان</div>
            <button class="add-to-cart" onclick="addToCart(\${product.id})">افزودن به سبد خرید</button>
          </div>
        </div>
      \`).join('')}
    </div>
  </div>

  <footer>
    <div class="container">
      <p>© 1403 فروشگاه محصولات هوش مصنوعی. تمامی حقوق محفوظ است.</p>
    </div>
  </footer>

  <script>
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    function addToCart(productId) {
      if (!cart.find(item => item.id === productId)) {
        const product = \${JSON.stringify(products)};
        const selectedProduct = product.find(p => p.id === productId);
        cart.push({ ...selectedProduct, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        alert('محصول به سبد خرید اضافه شد!');
      } else {
        alert('این محصول قبلاً در سبد خرید شما وجود دارد.');
      }
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        document.querySelectorAll('.product-card').forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  </script>
</body>
</html>
  \`);
});

// صفحه سبد خرید
app.get('/cart', (c) => {
  return c.html(\`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سبد خرید - فروشگاه AI</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }
    body { background: #f5f5f5; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 0; }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav-links { list-style: none; display: flex; gap: 20px; }
    .nav-links a { color: white; text-decoration: none; }
    .page-title { text-align: center; padding: 40px 0; }
    .cart-container { background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #eee; }
    .cart-item:last-child { border-bottom: none; }
    .item-info { display: flex; align-items: center; gap: 20px; }
    .item-image { width: 80px; height: 80px; object-fit: cover; border-radius: 5px; }
    .item-details h3 { margin-bottom: 5px; }
    .item-price { color: #2ed573; font-weight: bold; }
    .quantity-controls { display: flex; align-items: center; gap: 10px; }
    .qty-btn { width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 5px; cursor: pointer; }
    .remove-btn { background: #ff4757; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; }
    .cart-summary { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 30px; text-align: left; }
    .total { font-size: 1.5rem; font-weight: bold; color: #2ed573; margin: 20px 0; }
    .checkout-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; font-size: 1.1rem; cursor: pointer; }
    .empty-cart { text-align: center; padding: 60px 0; }
    .back-link { display: inline-block; margin-top: 20px; color: #667eea; text-decoration: none; }
    footer { background: #2c3e50; color: white; text-align: center; padding: 30px 0; margin-top: 50px; }
    @media (max-width: 768px) { .nav-links { display: none; } .cart-item { flex-direction: column; gap: 15px; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">🤖 فروشگاه AI</div>
        <ul class="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/products">محصولات</a></li>
          <li><a href="/about">درباره ما</a></li>
          <li><a href="/contact">تماس با ما</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container">
    <h1 class="page-title">سبد خرید شما</h1>
    
    <div class="cart-container">
      <div id="cartItems"></div>
      
      <div class="cart-summary" id="cartSummary" style="display: none;">
        <h3>خلاصه سفارش</h3>
        <div class="total">جمع کل: <span id="totalPrice">0</span> تومان</div>
        <button class="checkout-btn" onclick="checkout()">تکمیل خرید</button>
      </div>
      
      <div class="empty-cart" id="emptyCart">
        <h2>سبد خرید شما خالی است</h2>
        <a href="/products" class="back-link">→ مشاهده محصولات</a>
      </div>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>© 1403 فروشگاه محصولات هوش مصنوعی. تمامی حقوق محفوظ است.</p>
    </div>
  </footer>

  <script>
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const allProducts = \${JSON.stringify(products)};

    function renderCart() {
      const cartItemsEl = document.getElementById('cartItems');
      const cartSummaryEl = document.getElementById('cartSummary');
      const emptyCartEl = document.getElementById('emptyCart');

      if (cart.length === 0) {
        cartItemsEl.innerHTML = '';
        cartSummaryEl.style.display = 'none';
        emptyCartEl.style.display = 'block';
        return;
      }

      emptyCartEl.style.display = 'none';
      cartSummaryEl.style.display = 'block';

      cartItemsEl.innerHTML = cart.map((item, index) => \\\`
        <div class="cart-item">
          <div class="item-info">
            <img src="\\\${item.image}" alt="\\\${item.title}" class="item-image">
            <div class="item-details">
              <h3>\\\${item.title}</h3>
              <div class="item-price">\\\${item.price.toLocaleString()} تومان</div>
            </div>
          </div>
          <div class="quantity-controls">
            <button class="qty-btn" onclick="updateQuantity(\\\${index}, -1)">-</button>
            <span>\\\${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(\\\${index}, 1)">+</button>
            <button class="remove-btn" onclick="removeItem(\\\${index})">حذف</button>
          </div>
        </div>
      \\\`).join('');

      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      document.getElementById('totalPrice').textContent = total.toLocaleString();
    }

    function updateQuantity(index, change) {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }

    function removeItem(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }

    function checkout() {
      localStorage.removeItem('cart');
      window.location.href = '/order-success';
    }

    renderCart();
  </script>
</body>
</html>
  \`);
});

// صفحه موفقیت سفارش
app.get('/order-success', (c) => {
  return c.html(\`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>سفارش موفق - فروشگاه AI</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }
    body { background: #f5f5f5; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
    .success-box { background: white; border-radius: 10px; padding: 60px 40px; text-align: center; margin-top: 100px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    .success-icon { font-size: 4rem; color: #2ed573; margin-bottom: 20px; }
    h1 { color: #2ed573; margin-bottom: 20px; }
    p { color: #666; margin-bottom: 30px; line-height: 1.8; }
    .btn { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="success-box">
      <div class="success-icon">✓</div>
      <h1>سفارش شما با موفقیت ثبت شد!</h1>
      <p>از خرید شما سپاسگزاریم. کارشناسان ما به زودی با شما تماس خواهند گرفت.</p>
      <a href="/" class="btn">بازگشت به صفحه اصلی</a>
    </div>
  </div>
</body>
</html>
  \`);
});

// صفحه درباره ما
app.get('/about', (c) => {
  return c.html(\`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>درباره ما - فروشگاه AI</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }
    body { background: #f5f5f5; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 0; }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav-links { list-style: none; display: flex; gap: 20px; }
    .nav-links a { color: white; text-decoration: none; }
    .content-box { background: white; border-radius: 10px; padding: 40px; margin-top: 50px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    h1 { color: #667eea; margin-bottom: 20px; }
    p { line-height: 1.8; color: #666; margin-bottom: 15px; }
    footer { background: #2c3e50; color: white; text-align: center; padding: 30px 0; margin-top: 50px; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">🤖 فروشگاه AI</div>
        <ul class="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/products">محصولات</a></li>
          <li><a href="/about">درباره ما</a></li>
          <li><a href="/contact">تماس با ما</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="content-box">
      <h1>درباره ما</h1>
      <p>فروشگاه محصولات هوش مصنوعی با هدف ارائه خدمات نوین مبتنی بر تکنولوژی AI تأسیس شده است.</p>
      <p>ما با بهره‌گیری از پیشرفته‌ترین الگوریتم‌های هوش مصنوعی، خدمات منحصر به فردی را در زمینه‌های مختلف از جمله سلامت، زیبایی، سرگرمی و کسب‌وکار ارائه می‌دهیم.</p>
      <p>تیم متخصص ما متعهد است تا بهترین تجربه را برای کاربران ایرانی فراهم کند.</p>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>© 1403 فروشگاه محصولات هوش مصنوعی. تمامی حقوق محفوظ است.</p>
    </div>
  </footer>
</body>
</html>
  \`);
});

// صفحه تماس با ما
app.get('/contact', (c) => {
  return c.html(\`
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تماس با ما - فروشگاه AI</title>
  <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" rel="stylesheet" type="text/css" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Vazirmatn', sans-serif; }
    body { background: #f5f5f5; color: #333; }
    .container { max-width: 800px; margin: 0 auto; padding: 0 20px; }
    header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem 0; }
    nav { display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 1.5rem; font-weight: bold; }
    .nav-links { list-style: none; display: flex; gap: 20px; }
    .nav-links a { color: white; text-decoration: none; }
    .content-box { background: white; border-radius: 10px; padding: 40px; margin-top: 50px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
    h1 { color: #667eea; margin-bottom: 20px; }
    .contact-info { margin-bottom: 30px; }
    .contact-item { margin-bottom: 15px; color: #666; }
    form { display: flex; flex-direction: column; gap: 15px; }
    input, textarea { padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-family: 'Vazirmatn', sans-serif; }
    textarea { height: 150px; resize: vertical; }
    button { padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; }
    footer { background: #2c3e50; color: white; text-align: center; padding: 30px 0; margin-top: 50px; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <nav>
        <div class="logo">🤖 فروشگاه AI</div>
        <ul class="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/products">محصولات</a></li>
          <li><a href="/about">درباره ما</a></li>
          <li><a href="/contact">تماس با ما</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="content-box">
      <h1>تماس با ما</h1>
      <div class="contact-info">
        <div class="contact-item">📧 ایمیل: info@aishop.ir</div>
        <div class="contact-item">📱 تلفن: 021-12345678</div>
        <div class="contact-item">📍 آدرس: تهران، خیابان آزادی، پلاک 123</div>
      </div>
      <form onsubmit="event.preventDefault(); alert('پیام شما ارسال شد!');">
        <input type="text" placeholder="نام شما" required>
        <input type="email" placeholder="ایمیل" required>
        <textarea placeholder="پیام شما" required></textarea>
        <button type="submit">ارسال پیام</button>
      </form>
    </div>
  </div>

  <footer>
    <div class="container">
      <p>© 1403 فروشگاه محصولات هوش مصنوعی. تمامی حقوق محفوظ است.</p>
    </div>
  </footer>
</body>
</html>
  \`);
});

export default app;
