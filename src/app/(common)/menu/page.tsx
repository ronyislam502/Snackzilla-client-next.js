"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import FoodCard from "@/components/ui/FoodCard";
import CardSkeleton from "@/components/ui/skeleton/CardSkeleton";
import { useDebounce } from "@/components/utilities/Debaounce";
import { useAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useAllFoodsQuery } from "@/redux/features/food/foodApi";
import { TCategory, TFood } from "@/types/food";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const Menu = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromQuery = searchParams.get("category") || "";
  // ==== States ====
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromQuery);
  const [minPrice, setMinPrice] = useState<number>(10);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [search, setSearch] = useState<string>("");
  const [limit] = useState(6);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  // ==== Fetch Categories ====
  const { data: categories, isLoading: categoryLoading } =
    useAllCategoriesQuery({});

  // ==== Fetch Foods (single category filter) ====
  const { data: foods, isLoading } = useAllFoodsQuery({
    category: selectedCategory, // single category
    minPrice,
    maxPrice,
    search: debouncedSearch,
    sort,
    page,
    limit,
  });

  const totalPages = foods?.meta?.totalPage || 1;

  // ==== Handlers ====
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice) setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minPrice) setMaxPrice(value);
  };

  const clearSelection = () => {
    setSelectedCategory("");
    router.replace("/menu", { scroll: false });
  };

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setPage(1);
    router.replace("/menu", { scroll: false });
  };

  // ==== UI ====
  return (
    <div className="px-4 py-6">
      <SectionTitle subHeading="Explore our culinary library" heading="The Menu" />
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* ===== Sidebar Filters ===== */}
        <aside className="lg:col-span-1 space-y-10">
          {/* Search */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white uppercase tracking-tighter italic leading-none">Search.</h2>
              <div className="w-8 h-0.5 bg-success/30 rounded-full" />
            </div>
            <div className="relative">
               <input
                className="w-full bg-[#0a0a0a]/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:border-success/30 focus:outline-none transition-all italic font-medium"
                type="text"
                placeholder="Find a creation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
 
          {/* Price Range */}
          <div className="space-y-4">
             <div className="space-y-1">
              <h2 className="text-lg font-black text-white uppercase tracking-tighter italic leading-none">Valuation.</h2>
              <div className="w-8 h-0.5 bg-success/30 rounded-full" />
            </div>
            <p className="text-[11px] font-black text-success uppercase tracking-widest italic">
              ${minPrice} — ${maxPrice}+
            </p>
            <div className="space-y-4 pt-2">
              <input
                type="range"
                min={10}
                max={1000}
                value={minPrice}
                onChange={handleMinChange}
                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-success transition-all"
              />
              <input
                type="range"
                min={10}
                max={1000}
                value={maxPrice}
                onChange={handleMaxChange}
                className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-success transition-all"
              />
            </div>
          </div>
 
          {/* Category Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                <h2 className="text-lg font-black text-white uppercase tracking-tighter italic leading-none">Class.</h2>
                <div className="w-8 h-0.5 bg-success/30 rounded-full" />
              </div>
              <button
                onClick={clearSelection}
                className="text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-widest italic transition-colors"
              >
                Reset
              </button>
            </div>
            <div className="space-y-2">
              {categories?.data?.map((category: TCategory) => (
                <label
                  key={category?._id}
                  className={`flex items-center gap-3 p-2 rounded-xl border border-transparent cursor-pointer transition-all duration-300 ${selectedCategory === category._id ? 'bg-success/5 border-success/20 text-success' : 'hover:bg-white/5 text-gray-500'}`}
                >
                  <input
                    type="radio"
                    className="hidden"
                    name="category"
                    checked={selectedCategory === category._id}
                    onChange={() => handleCategoryChange(category?._id)}
                  />
                  <span className="text-[11px] font-black uppercase tracking-widest italic">{category?.name}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
 
        {/* ===== Food Cards ===== */}
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="hidden md:block">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Showing {foods?.data?.length || 0} results</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-xs font-black text-white uppercase tracking-tighter italic">Order By:</h2>
              <select
                className="bg-[#0a0a0a]/40 border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white font-black uppercase tracking-widest italic cursor-pointer focus:border-success/30 focus:outline-none transition-all"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Standard</option>
                <option value="price">Valuation ↓</option>
                <option value="-price">Valuation ↑</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <CardSkeleton count={limit} />
            ) : foods?.data?.length ? (
              foods.data.map((food: TFood) => (
                <FoodCard key={food._id} food={food} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                 <p className="text-4xl font-black text-white/5 uppercase italic tracking-tighter">No Creations Found</p>
                 <button onClick={clearSelection} className="text-xs font-black text-success uppercase tracking-widest italic">Reset Parameters</button>
              </div>
            )}
          </div>

          {(foods?.meta?.total as number) > limit && (
            <div className="flex items-center justify-center gap-6 py-10 border-t border-white/5">
              <button
                className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 disabled:opacity-20"
                disabled={page <= 1}
                onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
              >
                <span className="text-[10px] font-black uppercase tracking-widest italic px-4">Previous Arrangement</span>
              </button>
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic mb-1">Portfolio Page</p>
                <span className="text-lg font-black text-white italic tracking-tighter">
                  {page} <span className="text-success mx-1">/</span> {totalPages}
                </span>
              </div>
              <button
                className="p-3 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-success hover:text-black transition-all active:scale-90 disabled:opacity-20"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((prev: number) => Math.min(prev + 1, totalPages))
                }
              >
                 <span className="text-[10px] font-black uppercase tracking-widest italic px-4">Next Sequence</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
