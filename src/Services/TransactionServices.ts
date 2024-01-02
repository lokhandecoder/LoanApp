import axios from "axios";
import { TransactionByAccountID, TransactionModel, TransactionModelById } from "../Model/TransactionModel";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs
import { send } from "process";
import { API_DASHBAORD_URL, API_INTEREST_URL, API_TRANSACTIONS_URL } from "../API_CONFIG";

export async function CreateTransaction(Data: TransactionModelById): Promise<any> {
  try {

    const response = await axios.post(`${API_TRANSACTIONS_URL}`, Data);
    console.log("send data from api", response);

    return response;
  } catch (error: any) {
    console.log("erro from api", error.message);
    if (error.message) {
      const Error = error.message;
      return { error: Error };
    } else {
      console.log("An error occurred:", error?.message);
      return { error: error?.message };
    }
  }
}
export async function UpdateTransaction(transaction: TransactionModelById, id : string): Promise<any> {
    try {
        const response = await axios.put(`${API_TRANSACTIONS_URL}/${id}`, transaction);
        console.log("send data from api", response);
      
      return response;
    } catch (error: any) {
      console.log("erro from api", error.message)
      if (error.message) {
        const Error = error.message;
        return { error: Error };
      } else {
        console.log("An error occurred:", error?.message);
        return { error: error?.message };
      }
    }
  }
  export async function fetchTransactionByID(id : string): Promise<{ data: TransactionModelById}> {
    try {
      const response = await axios.get(`${API_TRANSACTIONS_URL}/${id}`);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }
  export async function GetTransactions(): Promise<{ data: TransactionModelById[]}> {
    try {
      const response = await axios.get(`${API_TRANSACTIONS_URL}`);
      console.log("res: ", response)
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export const DeleteTransaction = async (id: string) => {
    try {
      const response = await axios.delete(`${API_TRANSACTIONS_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const DeleteEMIbyInterestID = async (id: string) => {
    try {
      const response = await axios.delete(`${API_INTEREST_URL}/DeleteInterestEMIAsync/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export async function fetchTransactionByAccountID(senddata : any): Promise<{ data: TransactionByAccountID}> {
    try {
      console.log("dta top be sned", senddata)
      const response = await axios.post(`${API_TRANSACTIONS_URL}/GetTransactionsByAccountId`,senddata);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }

  
  export async function GenerateEMIbyTrnsactionID(data: any): Promise<any> {
    try {
  
      const response = await axios.post(`${API_INTEREST_URL}/GenerateInterestEMI`,data);
      console.log("send id  amit", response);
      return response;
    } catch (error: any) {
      console.log("erro from api", error.message);
      if (error.message) {
        const Error = error.message;
        return { error: Error };
      } else {
        console.log("An error occurred:", error?.message);
        return { error: error?.message };
      }
    }
  }
  export async function GenerateEMIforAll(data: any): Promise<any> {
    try {
  
      const response = await axios.post(`${API_INTEREST_URL}/GenerateInterestEMIs`,data);
      console.log("send id  amit", response);
      return response;
    } catch (error: any) {
      console.log("erro from api", error.message);
      if (error.message) {
        const Error = error.message;
        return { error: Error };
      } else {
        console.log("An error occurred:", error?.message);
        return { error: error?.message };
      }
    }
  }
  export async function GetInterestTransactionsForAllAccounts(): Promise<{ data: any}> {
    try {
      const response = await axios.get(`${API_DASHBAORD_URL}/GetInterestTransactionsForAllAccounts`);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }

  export async function GetPrincipalTransactionsDetailAsync(): Promise<{ data: any}> {
    try {
      const response = await axios.get(`${API_DASHBAORD_URL}/GetPrincipalTransactionsDetailAsync`);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }

  export async function GetAccountsAndUnpaidInterestAsync(): Promise<{ data: any}> {
    try {
      const response = await axios.get(`${API_DASHBAORD_URL}/GetAccountsAndUnpaidInterestAsync`);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }
  export async function GetUnpaidPrincipalAmountAsync(): Promise<{ data: any}> {
    try {
      const response = await axios.get(`${API_DASHBAORD_URL}/GetUnpaidPrincipalAmountAsync`);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }
//http://localhost:5164/api/InterestTransaction/GetInterestEMI/fc66e882-a29f-45f4-658e-08dc0070c04c