import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import {InputBox} from './components/index.js'
import { useEffect } from 'react';

function App() {
  document.title = "Currency Converter";
  const [amount, setAmount] = useState("")
  const [from, setFrom] = useState('cad')
  const [to, setTo] = useState('usd')
  const handleAmountChange = (value) => {
    // Check if the value is a valid number
    if (!isNaN(value)) {
        setAmount(value);
    } else {
        // Handle invalid input (optional)
        setAmount(""); // Setting to an empty string or a default value
    }
}
  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const [convertedAmount, setConvertedAmount] = useState(() => ((amount * currencyInfo[to]).toFixed(2)));


  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    } else {
      setConvertedAmount(0);
    }
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }


  useEffect(() => {
    convert();
  }, [amount, from, to]);  // Recalculate whenever amount, from, or to changes


  return ( 
    <div className ='w-full h-screen flex flex-wrap justify-center items-center bg-cover' 
    style={{backgroundColor: '#c4beb4', backgroundImage: `url(https://media.discordapp.net/attachments/765363966619680790/1190036432560062525/curbkgblack.jpg?ex=65a056cb&is=658de1cb&hm=f32b0aa351dcb4e5a0d3ea97e68c3132a8c470a5206c3f734820d43880bf2281&=&format=webp&width=1258&height=1258)`, backgroundSize: '115%',}}>
        <div className='w-full'>
          <div className = 'w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <form onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}>
              <div className='w-full mb-1'>
                <InputBox
                  label="Enter Amount:"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => {
                      setFrom(currency);
                      setConvertedAmount(0); // Reset convertedAmount when currency changes
                  }}
                  onAmountChange={handleAmountChange}
                  selectedCurrency={from}
                />
              </div>
              <div className='relative w-full h-0.5'>
                <button style={{backgroundColor: '#c4beb4'}} className='text-black absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black rounded-md bg-blue-600 text-white px-2 py-0.5'
                  onClick={swap}
                  >Swap</button>
              </div>
              <div className='w-full mb-1'>
                <InputBox
                  label="Conversion:"
                  currencyOptions={options}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => {
                    setTo(currency); 
                    setConvertedAmount(0); // Reset convertedAmount when currency changes
                  }}
                  selectedCurrency={to}
                  amountDisabled
                />
              </div>
            </form>
          </div>
        </div>
    </div>

  )
}

export default App
