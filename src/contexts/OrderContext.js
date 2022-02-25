import { createContext,useEffect,useMemo,useState } from "react";
export const OrderContext=createContext();

const pricePerItem={
    products:1000,
    options:500
}
function calculateSubtotal(orderType,orderCounts){
    let optionCount=0;
    for(const count of orderCounts[orderType].value()){
        optionCount+=count;
    }
    return optionCount* pricePerItem[orderType];
}
export function OrderContextProvider(props){
    const[orderCounts, setorderCounts]=useState({
        products:new Map(),
        options:new Map(),
    });
    const[total,settotal]=useState({
        products:0,
        options:0,
        total:0
    });
    useEffect(()=>{
        const productsTotal=calculateSubtotal("products",orderCounts);
        const optionsTotal=calculateSubtotal("options",orderCounts);
        const total=productsTotal+optionsTotal;
        settotal({
            products:productsTotal,
            options:optionsTotal,
            total
        });
    },[orderCounts]);
    const value=useMemo(()=>{
        function updateItemCount(itemName, newItemCount, orderType){
            const newOrderCounts={...orderCounts};
            console.log('newOrderCount before',newOrderCounts)
            const orderCountsMap=orderCounts[orderType];
            orderCountsMap.set(itemName, parseInt(newItemCount));
            console.log('newOrderCount after',newOrderCounts);
            setorderCounts(newOrderCounts);
        }
        return [{...orderCounts,total},updateItemCount];
    },[orderCounts, total]);
    return <OrderContextProvider value={value} {...props}/>;
}

