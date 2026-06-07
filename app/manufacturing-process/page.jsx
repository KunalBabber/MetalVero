import React from 'react'
import Image from 'next/image'
import imgInspection from '@/public/assets/images/mfg_material_inspection.png'
import imgCutting from '@/public/assets/images/mfg_precision_cutting.png'
import imgWelding from '@/public/assets/images/mfg_welding.png'
import imgSurface from '@/public/assets/images/mfg_surface_treatment.png'
import imgQuality from '@/public/assets/images/mfg_quality_control.png'

const ManufacturingProcess = () => {
    const steps = [
        {
            num: "01",
            title: "Raw Material Inspection",
            desc: "Every order begins with sourcing high-grade Iron and Steel. We perform rigorous quality checks for tensile strength and durability before processing.",
            img: imgInspection
        },
        {
            num: "02",
            title: "Precision Cutting & Shaping",
            desc: "Using advanced CNC laser cutters and hydraulic shears, materials are cut to exact specifications with micron-level tolerance.",
            img: imgCutting
        },
        {
            num: "03",
            title: "Welding & Fabrication",
            desc: "Our certified welders use MIG and TIG techniques to join components, ensuring structural integrity and clean, strong joints.",
            img: imgWelding
        },
        {
            num: "04",
            title: "Surface Treatment",
            desc: "Products undergo sandblasting to remove impurities, followed by anti-rust treatment and premium powder coating for a long-lasting finish.",
            img: imgSurface
        },
        {
            num: "05",
            title: "Quality Control & Grid",
            desc: "The final product is inspected for dimensions, finish quality, and stability. Only 100% defect-free items are packed for dispatch.",
            img: imgQuality
        }
    ]

    return (
        <div className='bg-white dark:bg-black font-sans text-gray-900 dark:text-gray-100'>
            <section className="py-20 px-4 text-center bg-gray-50 dark:bg-zinc-900">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Transparency</span>
                <h1 className='text-4xl md:text-5xl font-black uppercase mt-2'>How It's Made</h1>
                <p className='text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto'>
                    From raw metal to finished masterpiece, witness the journey of our manufacturing process.
                </p>
            </section>

            <section className="py-20 px-4 md:px-12">
                <div className="max-w-6xl mx-auto space-y-20">
                    {steps.map((step, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="md:w-1/2 relative h-80 w-full rounded-lg overflow-hidden shadow-lg border border-gray-100">
                                <Image src={step.img} fill alt={step.title} className="object-cover" />
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-6xl font-black text-gray-200 dark:text-zinc-800 block -mb-4 -ml-2">{step.num}</span>
                                <h3 className="text-3xl font-bold uppercase mb-4 relative z-10">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ManufacturingProcess
