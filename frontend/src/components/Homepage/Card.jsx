import React from 'react';
import CountUp from "react-countup";

const Card = ({value, text, tag}) => {
  return (
    <div>
        <div className="border-solide border-2 border-pink-600 px-24 py-5 rounded-md text-center shadow-lg shadow-pink-500 dark:shadow-lg dark:shadow-white md:px-16 lg:px-24">
                {/* <div className="text-4xl">{value}</div> */}
                {tag === "percent" ?
                  <CountUp
                  start={0}
                  end={value}
                  duration={5}
                  decimals={2}
                  decimal='.'
                  className='text-4xl'
                  formattingFn={value => `${value.toFixed(2)}%`}
                />
                : <CountUp
                start={0}
                end={value}
                duration={5}
                decimal='.'
                className='text-4xl'
                formattingFn={value => `${value}+`}
              />
                }
                <p>{text}</p>
         </div>
    </div>
  )
}

export default Card