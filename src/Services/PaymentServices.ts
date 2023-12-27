import axios from "axios";
import { TransactionByAccountID } from "../Model/TransactionModel";

export async function PayInterestAmount(data : any): Promise<{}> {
    try {
      const response = await axios.post(`http://localhost:5164/api/InterestTransaction/PayInterestAmount`,data);
      return response;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }
  export async function fetchInterestByTransactionId(id : string): Promise<{ data: TransactionByAccountID[]}> {
    try {
      const response = await axios.get(`http://localhost:5164/api/InterestTransaction/GetInterestEMIs/${id} `);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update transaction details: ' + (error as Error).message);
    }
  }