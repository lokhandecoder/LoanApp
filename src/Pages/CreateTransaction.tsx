import CreateTransactionForm from "../Components/CreateTransaction/CreateTransactionForm";
import LayoutComponent from "../Components/Fixed/LayoutComponent";

function CreateTransaction() {
    return (
        <>
          <LayoutComponent>
            <h1>Transaction</h1>
            <CreateTransactionForm />
          </LayoutComponent>
        </>
      );
}

export default CreateTransaction;