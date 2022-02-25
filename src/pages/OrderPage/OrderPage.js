/* Products, Options 
여행 상품의 가격은 각각 동일하며, 옵션들도 동일
여행 상품 선택 개수와 옵션 선택에 따라 총 가격 계산 
*/
import React, { useContext } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import Type from "./Type";

function OrderPage(){
    const [orderdata]=useContext(OrderContext);
    return(
        <div>
            <h1>Travel Products</h1>
            <div>
                <Type orderType="products"/>
            </div>
            <div style={{display:"flex", marginTop:20}}>
                <div style={{width:"50%"}}>
                    <Type orderType="options"/>
                </div>
                <div style={{width:"50%"}}>
                    <h2>Total Price:{orderdata.total.total}</h2><br/>
                    <button>주문</button>
                </div>
            </div>
        </div>
    )
}
export default OrderPage;