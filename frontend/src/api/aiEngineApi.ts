import axios, { AxiosInstance } from "axios";

// AI Engine API base URL - can be configured via environment variable
// Defaults to localhost:8084 for local development (matches docker-compose port mapping)
const aiEngineBaseURL =
  (import.meta.env.VITE_AI_ENGINE_API_BASE_URL as string | undefined) ||
  "http://localhost:8084";

// Dedicated HTTP client for AI Engine service
const aiEngineHttpClient: AxiosInstance = axios.create({
  baseURL: aiEngineBaseURL,
  timeout: 15000
});

export interface GetRecommendationsOptions {
  scope: string;
  timeRangeStart?: string;
  timeRangeEnd?: string;
  focus?: string;
  limit?: number;
}

export interface GetRecommendationExplanationOptions {
  recommendationId: string;
  scope?: string;
}

/**
 * AI Engine API client.
 * Provides methods to interact with the SpaceFlow AI Engine service.
 */
export const aiEngineApi = {
  /**
   * Retrieve advisory recommendations for a given context.
   *
   * @param options - Query parameters for recommendations request
   * @returns Promise resolving to the recommendations response
   */
  async getRecommendations(
    options: GetRecommendationsOptions
  ): Promise<unknown> {
    const params: Record<string, string | number> = {
      scope: options.scope
    };

    if (options.timeRangeStart) {
      params.timeRangeStart = options.timeRangeStart;
    }
    if (options.timeRangeEnd) {
      params.timeRangeEnd = options.timeRangeEnd;
    }
    if (options.focus) {
      params.focus = options.focus;
    }
    if (options.limit !== undefined) {
      params.limit = options.limit;
    }

    const response = await aiEngineHttpClient.get("/api/v1/recommendations", {
      params
    });
    return response.data;
  },

  /**
   * Retrieve explanation and rationale for a specific recommendation.
   *
   * @param recommendationId - Identifier of the recommendation to explain
   * @param scope - Optional context scope to validate or refine the explanation
   * @returns Promise resolving to the explanation response
   */
  async getRecommendationExplanation(
    recommendationId: string,
    scope?: string
  ): Promise<unknown> {
    const params: Record<string, string> = {};
    if (scope) {
      params.scope = scope;
    }

    const response = await aiEngineHttpClient.get(
      `/api/v1/recommendations/${recommendationId}/explanation`,
      { params }
    );
    return response.data;
  }
};
