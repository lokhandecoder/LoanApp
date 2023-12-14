import axios from "axios";
import { AccountModel } from "../Model/createAccount";
import { API_URL } from "../API_CONFIG";

export async function createAccountService(Data: AccountModel): Promise<any> {
  try {
    const response = await axios.post(
      `${API_URL}account`,
      Data
    );
    console.log("send data from api",response);
    
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
export async function GetAccounts(): Promise<{ data: AccountModel[]}> {
  try {
    const response = await axios.get(`${API_URL}account`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update leave data: ' + (error as Error).message);
  }
}