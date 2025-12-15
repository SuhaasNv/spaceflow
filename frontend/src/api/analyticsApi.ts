import { httpClient } from "./httpClient";

export interface UtilizationQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export type UtilizationResponse = Record<string, unknown>;

export const analyticsApi = {
  async getUtilization(
    params?: UtilizationQueryParams
  ): Promise<UtilizationResponse> {
    const response = await httpClient.get<UtilizationResponse>(
      "/api/v1/utilization",
      { params }
    );

    return response.data;
  }
};
