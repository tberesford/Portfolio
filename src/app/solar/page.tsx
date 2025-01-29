'use client';
import NavbarComponent from "@/components/navbarComponent";
import CustomLineChart from "@/components/charts_recharts/LineChart";
import { Card } from "@/components/Cards";
import CustomAreaChart from "@/components/charts_recharts/AreaChart";
import CustomBarChart from "@/components/charts_recharts/BarChart";
import CustomBeamChart from "@/components/motion/beam";

export default function SolarPage () {

    return (
        <div className="grid min-h-screen">
            <div className="grid grid-rows-1 w-full max-h-28 bg-white">
                <NavbarComponent/>
            </div>
            <div className="grid grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 md:gap-16 md:p-16 md:grid-rows-2 font-[family-name:var(--font-geist-sans)] justify-center">
                <div className="grid row-start-1 grid-cols-6 gap-6">
                    <div className="grid col-span-2">
                        <Card>
                            <CustomLineChart/>
                        </Card>
                    </div>
                    <div className="grid col-span-2">
                        <Card>
                            <CustomBeamChart/>
                        </Card>
                    </div>
                    <div className="grid col-span-2">
                        <Card>
                            <CustomBarChart/>
                        </Card>
                    </div>
                </div>
                <div className="grid row-start-2">
                    <Card>
                        <CustomAreaChart/>
                    </Card>
                </div>
            </div>
        </div>
    )
}