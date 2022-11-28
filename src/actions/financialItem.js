import {GET_FINANCIAL_ITEM} from "./types";

export const getFinancialItem = (symbol,range,pass,setLoader) => async dispatch => {
    const API_KEY = 'NOF7AHDHCAQKIBT0';
    let finItemSymbol = symbol;

    let financialChartXValuesFunction = [];
    let financialChartCloseValuesFunction = [];
    let financialChartOpenValuesFunction = [];
    let financialChartHighValuesFunction = [];
    let financialChartLowValuesFunction = [];

    try{
         await fetch(`https://www.alphavantage.co/query?function=${range}&symbol=${finItemSymbol}&outputsize=compact&apikey=${API_KEY}`)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);
                    setLoader(false);

                    for (let key in data[pass]) {
                        financialChartXValuesFunction.push(key);
                        financialChartCloseValuesFunction.push(data[pass][key]['4. close']);
                        financialChartOpenValuesFunction.push(data[pass][key]['1. open']);
                        financialChartHighValuesFunction.push(data[pass][key]['2. high']);
                        financialChartLowValuesFunction.push(data[pass][key]['3. low']);
                    }

                })

        const financialItem = {
            symbol: finItemSymbol,
            financialChartXValues: financialChartXValuesFunction,
            financialChartCloseValues: financialChartCloseValuesFunction,
            financialChartOpenValues: financialChartOpenValuesFunction,
            financialChartHighValues: financialChartHighValuesFunction,
            financialChartLowValues: financialChartLowValuesFunction,
        };

        dispatch({
            type: GET_FINANCIAL_ITEM,
            payload: financialItem
        })
    }catch (e) {
        console.log(e)
    }
}