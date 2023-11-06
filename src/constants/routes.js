import { AppLayout } from "layouts/AppLayout";
import { AuthLayout } from "layouts/AuthLayout";
import BookInfo from "pages/BookInfo/BookInfo";
import BooksPage from "pages/Books/BooksPage";
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";

export const routes = [
    {
        path: "/",
        Layout: AppLayout,
        Component: BooksPage,
    },
    {
        path: "/register",
        Layout: AuthLayout,
        Component: RegisterPage,
    },
    {
        path: "/login",
        Layout: AuthLayout,
        Component: LoginPage,
    },
    {
        path: "/books/:bookId",
        Layout: AppLayout,
        Component: BookInfo,
    },
];
