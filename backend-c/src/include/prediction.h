#ifndef PREDICTION_H
#define PREDICTION_H

#include <time.h>
#include <jansson.h>

/**
 * Price trend data point structure
 */
typedef struct {
    time_t date;        // Date of the data point
    int district_id;    // District ID
    int room_count;     // Number of rooms
    double price;       // Average price per square meter
    int sample_size;    // Number of properties used in the calculation
} price_trend_point_t;

/**
 * Price prediction result structure
 */
typedef struct {
    double current_avg_price;  // Current average price
    double prediction_6m;      // 6-month prediction
    double prediction_12m;     // 12-month prediction
    double confidence;         // Confidence level (0.0-1.0)
    time_t prediction_date;    // Date the prediction was made
} price_prediction_t;

/**
 * Get historical price trends for a specific district and room count
 *
 * @param district_id District ID
 * @param room_count Number of rooms
 * @param months Number of months to go back
 * @param out_count Pointer to store the number of returned data points
 * @return Array of price_trend_point_t, must be freed by caller
 */
price_trend_point_t* get_price_trends(int district_id, int room_count, int months, int* out_count);

/**
 * Get price prediction for a specific district and room count
 *
 * @param district_id District ID
 * @param room_count Number of rooms
 * @return price_prediction_t structure with prediction data
 */
price_prediction_t predict_prices(int district_id, int room_count);

/**
 * Generate prediction based on linear regression
 *
 * @param data Array of price_trend_point_t
 * @param count Number of data points
 * @param months_ahead Number of months to predict ahead
 * @return Predicted price
 */
double linear_regression_predict(price_trend_point_t* data, int count, int months_ahead);

/**
 * Calculate confidence level for the prediction
 *
 * @param data Array of price_trend_point_t
 * @param count Number of data points
 * @return Confidence level (0.0-1.0)
 */
double calculate_prediction_confidence(price_trend_point_t* data, int count);

/**
 * Handler for trend API endpoint
 *
 * @param district_id District ID
 * @param room_count Number of rooms
 * @param months Number of months to go back
 * @return JSON array with trend data
 */
json_t* price_get_trends_handler(int district_id, int room_count, int months);

/**
 * Handler for prediction API endpoint
 *
 * @param district_id District ID
 * @param room_count Number of rooms
 * @return JSON object with prediction data
 */
json_t* price_get_predictions_handler(int district_id, int room_count);

#endif // PREDICTION_H
