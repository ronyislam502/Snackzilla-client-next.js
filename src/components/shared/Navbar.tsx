"use client"

import Link from "next/link";
import { MenuLinks } from "./NavMenu";
import Image from "next/image";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { logout, TUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon, ArrowRightIcon } from "./Icons";
import { clearCart, setCartUser } from "@/redux/features/order/orderSlice";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const foods = useAppSelector((store) => store.cart.foods);
    const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
    const { data: userData } = useGetUserByEmailQuery(loggedUser?.email);
    const user = userData?.data?.[0] || userData?.data;
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeDropdown = () => setIsOpen(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("refreshToken");
        dispatch(setCartUser(""));
        dispatch(clearCart());
        toast.success(`Farewell, ${user?.name || 'Guest'}`, {
            autoClose: 1000,
        });
        closeDropdown();
        setIsMobileMenuOpen(false);
        router.push("/login");
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`sticky top-0 z-[100] px-4 py-3 transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg' : ''}`}
        >
            <div className="">
                <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl border border-success/20 rounded-2xl px-5 py-1.5 flex items-center justify-between shadow-2xl relative hover:border-blue-500/30 transition-colors duration-500">
                    {/* Default: success gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-success/8 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                    {/* Hover: blue gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                    {/* Brand & Desktop Nav */}
                    <div className="flex items-center gap-8 relative z-10">
                        <Link href="/" className="group flex items-center">
                            <div className="relative w-28 md:w-36 h-9 md:h-11 overflow-hidden rounded-sm border border-success/20 group-hover:border-blue-500/40 transition-all duration-500">
                                <Image
                                    src="https://i.postimg.cc/gjhSbS06/resturent.png"
                                    fill
                                    priority
                                    alt="logo"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 112px, 144px"
                                />
                            </div>
                        </Link>
                    </div>
                     <div className="hidden lg:flex items-center gap-5">
                            {MenuLinks?.map((menu) => (
                                <Link
                                    key={menu?.name}
                                    href={menu?.path}
                                    className={`relative px-2 py-1 text-[14px] font-black uppercase tracking-[0.2em] transition-all hover:text-white italic ${pathname === menu?.path ? "text-success" : "text-gray-500"
                                        }`}
                                >
                                    {menu?.name}
                                    {pathname === menu?.path && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-success rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4 relative z-10">
                        <Link href="/cart" className="relative p-2 bg-white/5 border border-white/5 rounded-lg text-white hover:bg-white/10 transition-all group">
                            <ShoppingCartIcon size={26} className="group-hover:scale-110 transition-transform" />
                            <AnimatePresence>
                                {foods?.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-success text-black text-[7px] font-black rounded-full flex items-center justify-center shadow-lg"
                                    >
                                        {foods?.length}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>

                        {mounted && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-0.5 pr-2 bg-white/5 border border-white/5 rounded-full flex items-center gap-1.5 hover:bg-white/10 transition-all group"
                                >
                                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-success/30 group-hover:border-success transition-colors">
                                        <Image
                                            src={user?.avatar || "https://i.ibb.co/5GzXkwq/user.png"}
                                            fill
                                            alt="avatar"
                                            className="object-cover"
                                            sizes="28px"
                                        />
                                    </div>
                                    <div className="hidden sm:block text-left">
                                        <p className="text-[7px] font-black text-white uppercase tracking-tighter leading-none italic">{user?.name?.split(' ')[0]}</p>
                                        <p className="text-[5.5px] font-bold text-success uppercase tracking-widest mt-0.5 italic">{user?.role}</p>
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-[105]"
                                                onClick={closeDropdown}
                                            />
                                            <motion.ul
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 top-full mt-2 p-2 bg-[#0a0a0a] border border-white/5 rounded-xl w-48 shadow-2xl backdrop-blur-3xl space-y-1 z-[110] menu"
                                            >
                                                <li className="px-2 py-1.5 border-b border-white/5 mb-1">
                                                    <p className="text-[7px] font-black text-gray-500 uppercase tracking-widest leading-none italic">Management Portal</p>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={`/${user?.role?.toLowerCase()}`}
                                                        onClick={closeDropdown}
                                                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-success hover:text-black transition-all group"
                                                    >
                                                        <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                                            <UserIcon size={10} />
                                                        </div>
                                                        <span className="text-[8px] font-black uppercase tracking-widest italic">Dashboard</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all group text-gray-400 w-full text-left"
                                                    >
                                                        <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-black/10 transition-colors rotate-180">
                                                            <ShoppingCartIcon size={10} />
                                                        </div>
                                                        <span className="text-[8px] font-black uppercase tracking-widest italic">Logout</span>
                                                    </button>
                                                </li>
                                            </motion.ul>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : mounted ? (
                            <Link href="/login" className="px-3 md:px-5 py-1.5 md:py-2 bg-success text-black text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em] rounded-lg hover:scale-105 active:scale-95 transition-all shadow-xl italic">
                                Auth
                            </Link>
                        ) : null}

                        {/* Mobile Toggle */}
                        <button 
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 bg-white/5 border border-white/5 rounded-lg text-white hover:bg-white/10 transition-all"
                        >
                            <MenuIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0a0a0a] border-l border-white/5 z-[120] lg:hidden flex flex-col p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">Navigation</h2>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-white/5 border border-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <XIcon size={18} />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-2 flex-1">
                                {MenuLinks?.map((menu) => (
                                    <Link
                                        key={menu?.name}
                                        href={menu?.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                                            pathname === menu?.path 
                                            ? "bg-success text-black border-success shadow-[0_0_20px_rgba(34,197,94,0.2)]" 
                                            : "bg-white/[0.02] text-white border-white/5 hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        <span className="text-[12px] font-black uppercase tracking-[0.2em] italic">{menu?.name}</span>
                                        <ArrowRightIcon size={14} className={`transition-transform duration-300 ${
                                            pathname === menu?.path ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                        }`} />
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest italic mb-2">Protocol Active</p>
                                    <p className="text-[10px] font-bold text-success italic uppercase tracking-widest">v2.4.0_SECURE</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
