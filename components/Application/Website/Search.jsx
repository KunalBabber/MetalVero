"use client";
import { Input } from "@/components/ui/input";
import { WEBSITE_SHOP, WEBSITE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";


const Search = ({ isShow, onClose }) => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef(null);
    const containerRef = useRef(null);

    const fetchSuggestions = async (q) => {
        if (!q || q.trim().length < 2) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/search/suggest?q=${encodeURIComponent(q)}&limit=6`);
            const data = await res.json();
            setSuggestions(data.data?.suggestions || []);
        } catch (err) {
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => fetchSuggestions(query), 250);
        return () => clearTimeout(timerRef.current);
    }, [query]);

    const handleSearch = () => {
        router.push(`${WEBSITE_SHOP}?q=${encodeURIComponent(query)}`);
        setQuery('');
        if (onClose) onClose();
    }

    const handleSelect = (slug) => {
        router.push(WEBSITE_PRODUCT_DETAILS(slug));
        setQuery('');
        if (onClose) onClose();
    }

    // close suggestions on outside click
    useEffect(() => {
        if (!isShow) return;
        const onDoc = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setSuggestions([]);
                if (onClose) onClose();
            }
        }
        document.addEventListener('click', onDoc);
        return () => document.removeEventListener('click', onDoc);
    }, [onClose, isShow]);

    return (
        <div ref={containerRef} className={`absolute border-t transition-all left-0 py-3 sm:py-5 md:px-32 px-4 z-50 bg-white w-full ${isShow ? "top-full" : "-top-full opacity-0 pointer-events-none"}`}>
            <div className="relative">
                <Input
                    className="rounded-full md:h-12 ps-5 border-primary"
                    placeholder="Search factory based products, hardware, industrial designs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button type="button" onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    <IoSearchOutline size={18} className="text-gray-500" />
                </button>

                {(loading || suggestions.length > 0 || (query.trim().length >= 2 && !loading)) && (
                    <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden">
                        {loading && <div className="p-3 text-sm text-gray-500">Searching...</div>}
                        {!loading && suggestions.length === 0 && query.trim().length >= 2 && (
                            <div className="p-3 text-sm text-gray-600">
                                <div>No products found for "{query}"</div>
                                <div className="mt-2">
                                    <button onClick={() => { router.push(WEBSITE_SHOP); if (onClose) onClose(); }} className="text-sm text-primary underline">Search full shop</button>
                                </div>
                            </div>
                        )}
                        {suggestions.map((sug) => (
                            <button key={sug._id} onClick={() => handleSelect(sug.slug)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-left">
                                <img src={sug.media?.[0]?.secure_url || '/assets/images/placeholder.png'} alt={sug.media?.[0]?.alt || sug.name} className="h-12 w-12 object-cover rounded" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{sug.name}</div>
                                    <div className="text-xs text-gray-500">{sug.sellingPrice ? `₹${sug.sellingPrice}` : ''}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;

