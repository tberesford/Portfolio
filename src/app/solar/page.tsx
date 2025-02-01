'use client';
import NavbarComponent from "@/components/ui/navbarComponent";
import CustomLineChart from "@/components/charts_recharts/LineChart";
import { Card } from "@/components/ui/Cards";
import CustomAreaChart from "@/components/charts_recharts/AreaChart";
import CustomBarChart from "@/components/charts_recharts/BarChart";
import CustomBeamChart from "@/components/motion/beam";

export default function SolarPage () {

    return (
        <div className="grid min-h-screen">
            <div className="grid grid-rows-1 w-full max-h-28 bg-white">
                <NavbarComponent/>
            </div>
            <div className="grid p-6 gap-6 md:gap-16 md:p-16 md:grid-rows-2 grid-cols-1 font-[family-name:var(--font-geist-sans)] justify-center">
                <div className="grid grid-cols-1 row-start-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div className="grid min-h-56 col-span-1 md:col-span-4 lg:col-span-6 xl:col-span-2 order-1 md:order-3 lg:order-3 xl:order-2">
                        <Card>
                            <CustomBeamChart/>
                        </Card>
                    </div>
                    <div className="grid min-h-56 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 order-2 sm:order-2 md:order-1 lg:order-1 xl:order-1">
                        <Card>
                            <CustomLineChart/>
                        </Card>
                    </div>
                    <div className="grid min-h-56 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 order-3 sm:order-3 md:order-2 lg:order-2 xl:order-3">
                        <Card>
                            <CustomBarChart/>
                        </Card>
                    </div>
                </div>
                <div className="grid min-h-56 row-start-2">
                    <Card>
                        <CustomAreaChart/>
                    </Card>
                </div>
            </div>
        </div>
    )
}