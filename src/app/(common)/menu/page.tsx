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
    // URL থেকে category মুছে ফেলে শুধু /menu রাখুন
    router.replace("/menu", { scroll: false });
  };

  // ==== UI ====
  return (
    <div className="max-w-[1280px] mx-auto">
      <SectionTitle subHeading="" heading="Foods" />
      <div className="grid lg:grid-cols-7 gap-2">
        {/* ===== Sidebar Filters ===== */}
        <div className="col-span-1 p-2 mt-10">
          {/* Search */}
          <div className="my-2 mt-10">
            <h2 className="text-2xl font-bold text-success">Search</h2>
            <input
              className="input input-success"
              type="text"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div className="my-2">
            <h3 className="font-semibold">Price</h3>
            <p className="mb-2">
              ${minPrice} – ${maxPrice}+
            </p>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10} // updated
                max={1000} // updated
                value={minPrice}
                onChange={handleMinChange}
                className="w-full accent-teal-700"
              />
              <input
                type="range"
                min={10} // updated
                max={1000} // updated
                value={maxPrice}
                onChange={handleMaxChange}
                className="w-full accent-teal-700"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="my-2">
            <h2 className="text-2xl font-bold text-success">Category</h2>
            <button
              onClick={clearSelection}
              className="text-blue-600 text-sm mb-2"
            >
              Clear
            </button>
            <div>
              {categories?.data?.map((category: TCategory) => (
                <label
                  key={category?._id}
                  className="flex items-center gap-2 mb-1"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category._id}
                    onChange={() => handleCategoryChange(category?._id)}
                  />
                  <span>{category?.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Food Cards ===== */}
        <div className="col-span-6">
          <div className="text-end my-2 w-1/2 ml-auto">
            <h2 className="text-2xl font-bold text-white">Sort by Price</h2>
            <select
              className="select select-success ml-2 w-1/4"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">ALL</option>
              <option value="price">Low to High</option>
              <option value="-price">High to Low</option>
            </select>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">
            {isLoading ? (
              <CardSkeleton count={limit} />
            ) : foods?.data?.length ? (
              foods.data.map((food: TFood) => (
                <FoodCard key={food._id} food={food} />
              ))
            ) : (
              <p className="col-span-3 text-7xl text-center">No foods found</p>
            )}
          </div>
          {(foods?.meta?.total as number) > limit && (
            <div className="flex gap-2 mx-auto text-center md:w-4/12 my-8">
              <button
                className="btn btn-outline btn-primary text-success btn-sm"
                disabled={page <= 1}
                onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
              >
                Prev
              </button>
              <span className="text-success">
                {page} / {totalPages}
              </span>
              <button
                className="btn btn-outline btn-primary text-success btn-sm"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((prev: number) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
