import { analyticsHttpClient } from "./httpClient";

export interface UtilizationQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface BookingUsageQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export type UtilizationResponse = Record<string, unknown>;
export type BookingUsageResponse = Record<string, unknown>;

export const analyticsApi = {
  async getUtilization(
    params?: UtilizationQueryParams
  ): Promise<UtilizationResponse> {
    const response = await analyticsHttpClient.get<UtilizationResponse>(
      "/api/v1/utilization",
      { params }
    );

    return response.data;
  },

  async getBookingUsage(
    params?: BookingUsageQueryParams
  ): Promise<BookingUsageResponse> {
    const response = await analyticsHttpClient.get<BookingUsageResponse>(
      "/api/v1/booking-usage",
      { params }
    );

    return response.data;
  }
};
