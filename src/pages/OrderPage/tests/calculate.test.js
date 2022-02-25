import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import Type from '../Type';

test("update product's total when products change", async()=>{
    render(<Type orderType="products"/>,{wrapper:OrderContextProvider});
    const productsTotal=screen.getByText("상품 총 가격:",{exact:false});
    expect(productsTotal).toHaveTextContent("0");

    // america 상품 1개를 올리기
    const americaInput=await screen.findByRole("spinbutton",{
        name:"America",
    });
    userEvent.clear();
    userEvent.type(americaInput,"1");
    expect(productsTotal).toHaveTextContent("1000");
})