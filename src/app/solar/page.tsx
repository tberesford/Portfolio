'use client';
import NavbarComponent from "../shared/components/navbarComponent";

import CustomLineChart from "../shared/components/charts_recharts/LineChart";
import { Card } from "../shared/components/Cards";
import CustomAreaChart from "../shared/components/charts_recharts/AreaChart";
import CustomBarChart from "../shared/components/charts_recharts/BarChart";

export default function SolarPage () {

    return (
        <div className="grid min-h-screen">
            <div className="grid grid-rows-1 w-full max-h-28 bg-white">
                <NavbarComponent/>
            </div>
            <div className="grid grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 md:gap-16 md:p-16 md:grid-rows-2 font-[family-name:var(--font-geist-sans)] justify-center">
                <div className="grid row-start-1 grid-cols-4 gap-6">
                    <div className="grid col-span-2">
                        <Card>
                            <CustomLineChart/>
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