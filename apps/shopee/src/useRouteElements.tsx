import { lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from '@/configs/path'
import { AppContext } from './providers/app.context'
import CartLayout from './layouts/CartLayout'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import UserLayout from './modules/User/features/UserLayout'

const Login = lazy(() => import('./modules/Login'))
const ProductList = lazy(() => import('./modules/ProductList'))
const Profile = lazy(() => import('./modules/User/pages/Profile'))
const Register = lazy(() => import('./modules/Register'))
const ProductDetail = lazy(() => import('./modules/ProductDetail'))
const Cart = lazy(() => import('./modules/Cart'))
const ChangePassword = lazy(() => import('./modules/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./modules/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('./modules/NotFound'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
