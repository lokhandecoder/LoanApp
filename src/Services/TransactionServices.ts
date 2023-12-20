import axios from "axios";
import { TransactionModel, TransactionModelById } from "../Model/TransactionModel";
import { API_URL } from "../API_CONFIG";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs

export async function CreateTransaction(Data: TransactionModelById): Promise<any> {
  try {

    const response = await axios.post(`http://localhost:5164/api/AccountTransaction`, Data);
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
        const response = await axios.put(`http://localhost:5164/api/AccountTransaction/${id}`, transaction);
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
      const response = await axios.get(`http://localhost:5164/api/AccountTransaction/${id}`);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }
  export async function GetTransactions(): Promise<{ data: TransactionModelById[]}> {
    try {
      const response = await axios.get(`http://localhost:5164/api/AccountTransaction`);
      console.log("res: ", response)
      return response.data;
    } catch (error) {
      throw new Error('Failed to update leave data: ' + (error as Error).message);
    }
  }
  export const DeleteTransaction = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:5164/api/AccountTransaction/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };