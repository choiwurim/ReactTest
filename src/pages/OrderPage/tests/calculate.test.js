import { render,screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../contexts/OrderContext";
import OrderPage from "../OrderPage";
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

test("update option's total when options change",async()=>{
    render(<Type orderType="options"/>);
    const optionsTotal=screen.getByText("옵션 총 가격:",{exact:false});
    expect(optionsTotal).toHaveTextContent("0");

    const InsuranceCheckBox=await screen.findByRole("checkbox",{
        name:"Insurance"
    });
    userEvent.click(InsuranceCheckBox);
    expect(optionsTotal).toHaveTextContent("500");

    const DinnerCheckBox=await screen.findByRole("checkbox",{
        name:"Dinner"
    });
    userEvent.click(DinnerCheckBox);
    expect(DinnerCheckBox).toHaveTextContent("1000");

    const FirstClassCheckBox=await screen.findByRole("checkbox",{
        name:"FirstClass"
    });
    userEvent.click(FirstClassCheckBox);
    expect(FirstClassCheckBox).toHaveTextContent("1500");
})

describe("total price of goods and options",()=>{
    test("total price starts with 0 and Updating total price when adding one product",async()=>{
        render(<OrderPage/>);
        const total=screen.getByText("Total Price:",{exact:false});
        expect(total).toHaveTextContent("0");
        const americaInput=await screen.findByRole("spinbutton",{
            name:"America"
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput,"1");
        expect(total).toHaveTextContent("1000");
    });
    test("Updating total price when adding one option",async()=>{
        render(<OrderPage/>);
        const total=screen.toHaveTextContent("Total Price:",{expect:false});
        
        const InsuranceCheckBox=await screen.findByRole("checkbox",{
            name:"Insurance",
        });
        userEvent.click(InsuranceCheckBox);
        expect(total).toHaveTextContent("500");
    });
    test("Updating total price when removing option and product",async()=>{
        render(<OrderPage/>);
        const total=screen.toHaveTextContent("Total Price:",{expect:false});

        const InsuranceCheckBox=await screen.findByRole("checkbox",{
            name:"Insurance",
        });
        userEvent.click(InsuranceCheckBox);

        const americaInput=await screen.findByRole("spinbutton",{
            name:"America"
        });
        userEvent.clear(americaInput);
        userEvent.type(americaInput,"3");
        
        userEvent.clear(americaInput);
        userEvent.type(americaInput,"1");
        
        expect(total).toHaveTextContent("1500");
    });
})
