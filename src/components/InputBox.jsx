import React, {useId} from "react"

function InputBox({

    label, 
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "cad",
    amountDisabled = false,
    currencyDisabled = false,
    className = ""
})  {

    const id = useId()

    return (
        <div style={{ backgroundColor: "#282c34" }} className={`big-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className='w-1-2'>
                <label htmlFor={id} className='text-white/40 mb-2 inline-block'>{label}</label>
                <input 
                id={id}
                type="number"
                inputMode="decimal"
                className='text-white outline-none w-full bg-transparent py-1.5'
                placeholder = 'Amount'
                step="any" // to get rid of the stepper buttons beside the input box
                disabled = {amountDisabled}
                value={amount}
                onChange={(e) => onAmountChange && onAmountChange (Number(e.target.value))} //onEvent listener
                />
            </div>

            <div className='w-1/2 flex flex-wrap justify-end text-right'>
                <p className="text-white/50 mb-2 w-full whitespace-nowrap">Currency Type</p>
                <select 
                    className='rounded-lg px-1 py-1 bg-grey-100 cursor-pointer outline-none max-w-full'
                    style={{ backgroundColor: '#c4beb4' }}  
                    value={selectedCurrency}
                    onChange={(e) => { onCurrencyChange && onCurrencyChange(e.target.value)}}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>




        </div>
    )
}

export default InputBox