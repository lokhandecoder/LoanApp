import React from "react";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import TransactionTable from "../Components/Transaction/TransactionTable";
import GenerateEMISearch from "../Components/GenerateEMI/GenerateEMISearch";
import { GenerateEMIUtilities } from "../Utilities/GenerateEMIUtilities";
import GenerateEMITable from "../Components/GenerateEMI/GenerateEMITable";

function GenerateEMI() {
  const EMI = GenerateEMIUtilities();

  const {
    selectedAccountId,
    handleSelectChange,
    accountList,
    isError,
    handleSearch,
    handleReset,
    generateList,
    fetchTransactionByAccountId,
    selectedDate,
    handleDateChange,
  } = EMI;

  return (
    <>
      <LayoutComponent>
        <GenerateEMISearch
          selectedAccountId={selectedAccountId}
          handleSelectChange={handleSelectChange}
          accountList={accountList || []} // Using empty array as fallback when accountList is undefined
          isError={isError}
          handleSearch={handleSearch}
          handleReset={handleReset}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate || null}
        />
        {generateList && generateList.length > 0 && (
          <GenerateEMITable
            generateList={generateList}
            fetchTransactionByAccountId={() =>
              fetchTransactionByAccountId({
                accountId : selectedAccountId,
                EmiMonth: selectedDate
              })
            }
            selectedDate={selectedDate || null}
            selectedAccountId={selectedAccountId}
              handleSearch={handleSearch} // Pass handleSearch function

          />
        )}
      </LayoutComponent>
    </>
  );
}

export default GenerateEMI;
