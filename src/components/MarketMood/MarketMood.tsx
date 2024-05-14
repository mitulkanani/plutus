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
        try {
          const parsedRes = JSON.parse(res); // Parse the JSON response
          const response = parsedRes.response; // Extract the response string

          const regex = /Positivity:([\d.]+)%,?\s*Negativity:([\d.]+)%/;
          const match = response.match(regex);

          if (match) {
            const positivityRate = parseFloat(match[1]);
            const negativityRate = parseFloat(match[2]);

            console.log(positivityRate);
            console.log(negativityRate);

            setIsPositivity(positivityRate);
            setIsNegativity(negativityRate);
          }
        } catch (err) {
          console.log('Error parsing response:', err);
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
