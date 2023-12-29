import { useEffect, useState } from "react";

export default function useCurrencyInfo(currency){
    const [data, setData] = useState({}); // as soon as this hook will mount, it will pass the currency onto the api
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`) //fetches currency from the api
        .then((res) => res.json())
        .then((res => setData(res[currency])))
    }, [currency]) // any change in the current, will recall the method to retrieve

    return data
}

