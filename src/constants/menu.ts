import { Menu } from "../types/Menu";
import {
    DashboardOutlined,
    AppstoreOutlined,
    TeamOutlined,
    SettingOutlined,
    BarChartOutlined,
    LogoutOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";

const menuItems: Menu[] = [
    {
        name: "Home",
        icon: DashboardOutlined,
        url: "/",
    },
    {
        name: "Users",
        icon: UsergroupAddOutlined,
        url: "/users",
    },
    {
        name: "Posts",
        icon: SettingOutlined,
        url: "/posts",
    },
    {
        name: "Category",
        icon: AppstoreOutlined,
        url: "/category",
    },
    {
        name: "Department",
        icon: TeamOutlined,
        url: "/department",
    },
    {
        name: "Analytics",
        icon: BarChartOutlined,
        url: "/analytics",
    },
    // {
    //     name: "Payments",
    //     icon: WalletOutlined,
    //     url: "/payment",
    // },

    // {
    //     name: "Products",
    //     icon: ShoppingCartOutlined,
    //     url: "/product",
    // },
    // {
    //     name: "Orders",
    //     icon: FileTextOutlined,
    //     url: "/order",
    // },
    {
        name: "Settings",
        icon: SettingOutlined,
        url: "/settings",
    },
    {
        name: "Sing out",
        icon: LogoutOutlined,
        url: "/logout",
    },

    // {
    //     name: "Support",
    //     icon: CustomerServiceOutlined,
    //     url: "/support",
    // },
    // {
    //     name: "Discounts",
    //     icon: TagsOutlined,
    //     url: "/discounts",
    // },

    // {
    //     name: "Gifts",
    //     icon: GiftOutlined,
    //     url: "/gifts",
    // },
    // {
    //     name: "Vendor",
    //     icon: ShopOutlined,
    //     url: "/vendor",
    // },
];

export default menuItems;
