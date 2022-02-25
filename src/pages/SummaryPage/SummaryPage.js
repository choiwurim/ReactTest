/* 주문 확인 
Products:가격
상품 목록
체크 박스 / 주문하려는 것을 확인하셨나요?
버튼 / 주문 확인
*/
import React,{useState} from "react";

const SummaryPage=()=>{
    const [checked, setchecked]=useState(false);
    return(
        <div>
            <form>
                <input type="checkbox" checked={checked} onChange={(event)=>setchecked(event.target.checked)} id="confirm-checkbox"/>
                <label htmlFor="confirem-checkbox">주문하려는 것을 확인하셨나요?</label>
                <br/>
                <button disabled={!checked} type="submit">
                    주문 확인
                </button>
            </form>
        </div>
    )
}

export default SummaryPage;