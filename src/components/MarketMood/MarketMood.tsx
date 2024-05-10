"use client"
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { Derivative } from '@/services/http/derivative';

const MarketMood = () => {
    useEffect(() => {
        Derivative.market('http://18.218.201.198:8080/')
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const [chartData, setChartData] = useState<any>({
        series: [50, 50],
        options: {
            chart: {
                type: 'donut',
            },
            colors: ['#33FF57', '#FF5733'],
            labels: ['Positivity', 'Negativity'],
            legend: {
                fontSize: '18px', 
                style: {
                    colors: ['#ffffff !important']
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 500
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    });

    return (
        <div className='bg-[#1c1c21] relative flex justify-center h-[calc(100vh-78px)] items-start overflow-y-hidden'>
            <div id="chart" className='pt-10 container flex justify-center w-[450px] mx-auto'>
                <ReactApexChart options={chartData.options} series={chartData.series} type={chartData.options.chart.type as 'donut'} width={500} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default MarketMood;
