"use client"
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Derivative } from '@/services/http/derivative';
import { PieChart } from '@mui/x-charts';
import Spinner from '../Spinner/Spinner';

const MarketMood = () => {
  const [positivity, setIsPositivity] = useState(0)
  const [negativity, setIsNegativity] = useState(0)
  const [isSpinner, setIsSpinner] = useState(false)

  useEffect(() => {
    setIsSpinner(true);
    Derivative.market('mood')
      .then((res) => {
        const regex = /Negativity rate:([\d.]+)%Positivity rate:([\d.]+)%/;
        const match = res.match(regex);
        if (match) {
          const negativityRate = parseFloat(match[1]);
          const positivityRate = parseFloat(match[2]);
          setIsNegativity(negativityRate);
          setIsPositivity(positivityRate);
        }
        setIsSpinner(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSpinner(false);
      });
  }, []);


  return (
    <div className='bg-[#1c1c21] relative flex justify-center h-[calc(100vh-78px)] items-start overflow-y-hidden'>
      <div className='pt-10'>
        {
          isSpinner ? <Spinner color="#1c1c21" textColor="#fff" />
            :
            <PieChart
              colors={['#e53e34', '#30d158']}
              series={[
                {
                  data: [
                    { id: 0, value: negativity, label: 'Negativity' },
                    { id: 1, value: positivity, label: 'Positivity' }
                  ],
                },
              ]}
              width={600}
              height={300}
            />

        }

      </div>
    </div>
  );
};

export default MarketMood;
