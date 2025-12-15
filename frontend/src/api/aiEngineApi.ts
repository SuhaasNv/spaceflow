import axios, { AxiosInstance } from "axios";

const aiBaseURL = import.meta.env
  .VITE_AI_ENGINE_BASE_URL as string | undefined;

// Dedicated Axios instance for AI Engine calls so we can target the correct port.
// This keeps analytics and AI traffic clearly separated.
const aiHttpClient: AxiosInstance = axios.create({
  baseURL: aiBaseURL,
  timeout: 15000
});

export interface AiRecommendationsQueryParams {
  // TODO: Align query params with finalized AI Engine API contract (e.g. scope, limit, filters).
  [key: string]: string | number | boolean | undefined;
}

export type AiRecommendationsResponse = Record<string, unknown>;
export type AiRecommendationExplanationResponse = Record<string, unknown>;

// Thin API client for AI Engine service HTTP calls.
// This layer intentionally avoids embedding any AI logic – it only transports data.
export const aiEngineApi = {
  async getRecommendations(
    params?: AiRecommendationsQueryParams
  ): Promise<AiRecommendationsResponse> {
    // NOTE: AI Engine is versioned under /api/v1, see RecommendationsController.
    // When talking directly to the ai-engine service (e.g. http://localhost:8084),
    // the full URL is: {VITE_AI_ENGINE_BASE_URL}/api/v1/recommendations
    const response = await aiHttpClient.get<AiRecommendationsResponse>(
      "/api/v1/recommendations",
      { params }
    );

    return response.data;
  },

  async getRecommendationExplanation(
    recommendationId: string
  ): Promise<AiRecommendationExplanationResponse> {
    const response =
      await aiHttpClient.get<AiRecommendationExplanationResponse>(
        `/api/v1/recommendations/${encodeURIComponent(
          recommendationId
        )}/explanation`
      );

    return response.data;
  }
};


