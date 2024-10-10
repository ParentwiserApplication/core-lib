import axios, { AxiosError, AxiosInstance } from "axios";

class PremiumCodeApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.client = axios.create({
      baseURL,
      headers: token ? { Authorization: `${token}` } : {},
    });
  }

  async create(
    userId:string,
    maxUsageCount: number = 1,
    childId:string,
    startDatetime: Date = new Date(),
    dayCount: number = 30,
    schoolId: string,
  ): Promise<any> {
    try {
      const response = await this.client.post(`/premiumCode/code`, {
        userId,
        maxUsageCount,
        childId,
        startDatetime,
        dayCount,
        schoolId
      });
      return response.data.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: AxiosError): void {
    if (error.response) {
      console.error("Error Response:", error.response.data);
    } else if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
  }
}

export default PremiumCodeApiClient;
