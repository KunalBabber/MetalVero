import { connectDB } from '@/lib/databaseConnection';
import '@/models/Category.model';
import '@/models/Media.model';
import ProductModel from '@/models/Product.model';
import Link from 'next/link';
import Image from 'next/image';
import IndustrialProductCard from '@/components/Application/Website/IndustrialProductCard';
import { FaArrowRight } from "react-icons/fa";
import factoryShowcase from '@/public/assets/images/factory-showcase.jpg';

const Home = async () => {

    let productData = { success: false, data: [] };
    // try {
    await connectDB();
    // Fetch featured or latest products directly from DB, excluding deleted ones
    const products = await ProductModel.find({ deletedAt: null }).sort({ createdAt: -1 }).limit(8).populate('category').populate('media').lean();
    // lean() returns POJOs, but ObjectIds might be objects. Need to serialize if passing to client, 
    // but here we are in a server component rendering server-side, so usually fine unless passing to client component.
    // IndustrialProductCard is likely client component? Let's check imports.
    // If IndustrialProductCard is client, we need to ensure data is serializable.
    // Mongoose 6+ lean() is usually good, but let's convert manually if needed.
    const serializableProducts = JSON.parse(JSON.stringify(products));
    productData = { success: true, data: serializableProducts };
    // } catch (error) {
    //     console.error("Error fetching products:", error);
    // }

    const categories = [
        { name: 'Iron Furniture', image: '/assets/images/cat_iron_furniture.png', link: '/shop?category=iron' },
        { name: 'Steel Furniture', image: '/assets/images/cat_steel_furniture.png', link: '/shop?category=steel' },
        { name: 'Wood & Metal', image: '/assets/images/cat_wood_metal.png', link: '/shop?category=custom' },
    ];

    // Placeholder images for categories if real ones aren't available - using colors/text for now to avoid broken images if possible,
    // or relying on the user having generic placeholders.
    // I'll stick to a robust fallback UI for categories.

    return (
        <main className="overflow-x-hidden bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100">

            {/* HER0 SECTION */}
            <section className="relative min-h-[85vh] flex items-center bg-zinc-950 text-white overflow-hidden pt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20 pb-16">
                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tighter shadow-sm">
                            Forged in <span className="text-primary">Metal</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light tracking-wide border-l-4 border-primary pl-4">
                            Premium industrial furniture designed for longevity and style. Iron, steel, and custom metalwork for your modern space.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/shop"
                                className="inline-flex justify-center items-center bg-primary text-white hover:bg-white hover:text-black text-sm sm:text-base font-bold py-3 sm:py-4 px-6 sm:px-10 uppercase tracking-widest transition-all duration-300 transform hover:scale-105"
                            >
                                Explore Collection
                            </Link>
                        </div>
                    </div>
                    <div className="relative h-[400px] md:h-[550px] w-full rounded-sm overflow-hidden border-2 border-zinc-800 shadow-2xl group">
                        <Image 
                            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
                            alt="Factory manufacturing iron and steel"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute bottom-6 left-6 z-20">
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">Industrial Excellence</span>
                        </div>
                    </div>
                </div>
                
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-[60%] h-full bg-zinc-900 skew-x-[-15deg] translate-x-20 z-0 opacity-50 pointer-events-none" />
                <div className="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none" />
            </section>

            {/* CATEGORIES SECTION */}
            <section className="py-20 px-4 md:px-12 bg-gray-50 dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Expertise</span>
                        <h2 className="text-3xl md:text-4xl font-black uppercase mt-2 text-zinc-900 dark:text-white">Shop By Category</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat, idx) => (
                            <Link href={cat.link} key={idx} className="group relative h-96 overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
                                <div className="absolute inset-0 bg-zinc-900 group-hover:bg-zinc-800 transition-colors" />
                                <div
                                    className="absolute inset-0 z-0 opacity-40 group-hover:opacity-30 transition-opacity duration-500 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${cat.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 border-zinc-500/50 m-4 border pointer-events-none">
                                    <h3 className="text-3xl font-bold text-white uppercase text-center">{cat.name}</h3>
                                    <span className="mt-4 text-primary font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                                        View Products <FaArrowRight />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROMOTIONAL BANNER SECTION */}
            <section className="py-10 px-4 md:px-12 max-w-7xl mx-auto w-full">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-sm border-2 border-zinc-200 dark:border-zinc-800 group">
                    <Image 
                        src={factoryShowcase}
                        alt="Factory Manufacturing Process"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center items-center text-center p-6">
                         <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase mb-4 tracking-wider shadow-sm">Precision Engineering</h2>
                         <p className="text-lg text-gray-200 max-w-2xl font-light mb-8">Discover our state-of-the-art facility where raw iron and steel are transformed into stunning industrial furniture.</p>
                         <Link href="/about-factory" className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-3 px-8 uppercase tracking-widest transition-all">
                             Take a Tour
                         </Link>
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-20 px-4 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Selected Works</span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase mt-2 text-zinc-900 dark:text-white">Featured Products</h2>
                        </div>
                        <Link href="/shop" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-wider hover:text-primary transition-colors">
                            View All <FaArrowRight />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {!productData?.success ? (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                Loading products...
                            </div>
                        ) : (
                            productData.data.map((product) => (
                                <IndustrialProductCard key={product._id} product={product} />
                            ))
                        )}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/shop" className="inline-block border-b-2 border-black dark:border-white font-bold uppercase tracking-wider pb-1">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* CUSTOM DESIGN CTA */}
            <section className="py-24 px-4 md:px-12 bg-zinc-950 text-white relative overflow-hidden mt-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="order-2 lg:order-1 relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden border-2 border-zinc-800 shadow-2xl group">
                        <Image 
                            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
                            alt="Custom Metal Welding"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                        <div className="absolute top-6 right-6 z-20">
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider border border-white/20">Bespoke Design</span>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 text-left">
                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 tracking-tight">Need Custom Metalwork?</h2>
                        <p className="text-lg text-gray-300 mb-10 leading-relaxed border-l-4 border-primary pl-4">
                            We specialize in bespoke iron and steel designs. From bulk orders for restaurants to unique pieces for your home, we build it to last.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/custom-order" className="inline-flex justify-center items-center bg-primary text-white hover:bg-white hover:text-black text-sm sm:text-base font-bold py-3 sm:py-4 px-6 sm:px-10 uppercase tracking-widest transition-all duration-300 transform hover:scale-105">
                                Get a Quote
                            </Link>
                            <Link href="https://wa.me/8252338182" className="inline-flex justify-center items-center border-2 border-zinc-700 text-white hover:border-white hover:bg-white hover:text-black text-sm sm:text-base font-bold py-3 sm:py-4 px-6 sm:px-10 uppercase tracking-widest transition-all duration-300">
                                Chat on WhatsApp
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Background decorative elements */}
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 skew-x-[20deg] -translate-x-20 z-0 pointer-events-none" />
            </section>

        </main>
    );
};

export default Home;
