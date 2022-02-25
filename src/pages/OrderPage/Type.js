import React,{useState,useEffect, useContext} from "react";
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../../component/ErrorBanner";
import Options from "./Options";
import {OrderContext} from "../../contexts/OrderContext";

export default function Type({orderType}){
    const [items, setitems]=useState([]);
    const [error, seterror]=useState(false);
    const [orderdata,updateItemCount]=useContext(OrderContext);
    useEffect(()=>{
        loadItems(orderType);
    },[orderType]);
    
    const loadItems=async(orderType)=>{
        try{
            let response=await axios.get(`http://localhost:5000/${orderType}`);
            setitems(response.data);
        }
        catch(error){
            seterror(true);
        }
    };

    if(error){
        return <ErrorBanner message="에러가 발생"/>;
    }

    const ItemComponents=orderType==="products" ? Products : Options;
    const optionItems=items.map((item)=>(
        <ItemComponents key={item.key} name={item.name} imagePath={item.imagePath} 
        updateItemCount={(itemName,newItemCount)=>updateItemCount(itemName,newItemCount,orderType)}
        />
    ));
    return(
        <>
        <h2>주문 종류</h2>
        <p>하나의 가격</p>
        <p>총 가격:{orderdata.total[orderType]}</p>
        <div style={{display:'flex', flexDirection:orderType==="options"&&"column"}}>{optionItems}</div>
        </>
    )
}