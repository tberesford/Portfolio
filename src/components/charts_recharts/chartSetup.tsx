import React, { Suspense } from "react";
import { Card } from "../Cards";
import CustomLineChart from "./LineChart";


export default function Chart () {   
    return (
        <Card>
            <Suspense fallback={<div>Loading...</div>}>
                <CustomLineChart/>
            </Suspense>
        </Card>
    )
}
