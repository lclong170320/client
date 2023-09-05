import Cart from '../views/cart';
import Payment from '../views/cart/payment';
import DetailProduct from '../views/detailProduct';
import DetailCategory from '../views/detailCategory';
import Home from '../views/home/Home';
import SearchProduct from '../views/searchProduct';
import Introduce from '../views/home/introduce';
import Contact from '../views/home/contact';
import Support from '../views/home/support';
import Info from '../views/account/info';
import Order from '../views/account/order';
import Address from '../views/account/address';
import Like from '../views/account/like';
import Comment from '../views/account/comment';
import Password from '../views/account/password';

// không cần đăng nhập
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/gioi-thieu', component: Introduce, noSidebar: true },
  { path: '/lien-he', component: Contact, noSidebar: true },
  { path: '/ho-tro', component: Support, noSidebar: true },
  { path: '/detail/product/:product_id', component: DetailProduct },
  { path: '/detail/categories/:category_id', component: DetailCategory },
  { path: '/search/product', component: SearchProduct },
  { path: '/cart', component: Cart },
];
// cần đăng nhập
const privateRoutes = [
  { path: '/cart/payment', component: Payment, layout: null },
  { path: '/tai-khoan/thong-tin-ca-nhan', component: Info, noSidebar: true },
  { path: '/tai-khoan/doi-mat-khau', component: Password, noSidebar: true },
  { path: '/tai-khoan/hoa-don', component: Order, noSidebar: true },
  { path: '/tai-khoan/dia-chi', component: Address, noSidebar: true },
  { path: '/tai-khoan/yeu-thich', component: Like, noSidebar: true },
  { path: '/tai-khoan/binh-luan', component: Comment, noSidebar: true },
];
export { publicRoutes, privateRoutes };
