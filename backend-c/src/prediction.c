#include "include/prediction.h"
#include "include/db.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>
#include <jansson.h>

// Get historical price trends for a specific district and room count
price_trend_point_t* get_price_trends(int district_id, int room_count, int months, int* out_count) {
    printf("[STUB] get_price_trends called for district %d, %d rooms, %d months\n", 
           district_id, room_count, months);
    
    // Return dummy data for the visual MVP
    *out_count = 12; // 12 months of data
    price_trend_point_t* trends = malloc(sizeof(price_trend_point_t) * (*out_count));
    
    time_t now = time(NULL);
    struct tm* current_tm = localtime(&now);
    
    // Start 12 months ago
    current_tm->tm_year -= 1;
    
    for (int i = 0; i < *out_count; i++) {
        // Move forward one month for each data point
        current_tm->tm_mon += 1;
        if (current_tm->tm_mon > 11) {
            current_tm->tm_mon = 0;
            current_tm->tm_year += 1;
        }
        
        // Create a data point with a slight upward trend
        trends[i].date = mktime(current_tm);
        trends[i].district_id = district_id;
        trends[i].room_count = room_count;
        
        // Base price depends on district and room count
        double base_price = 0.0;
        if (district_id == 1) { // Botanica
            base_price = room_count == 1 ? 900.0 : 950.0;
        } else if (district_id == 2) { // Centru
            base_price = room_count == 1 ? 1050.0 : 1150.0;
        } else if (district_id == 3) { // Ciocana
            base_price = room_count == 1 ? 800.0 : 850.0;
        } else {
            base_price = 900.0; // Default
        }
        
        // Add a small upward trend (about 5-7% annual growth)
        trends[i].price = base_price * (1.0 + (0.005 * i));
        trends[i].sample_size = 30 + (rand() % 20); // Random sample size between 30-50
    }
    
    return trends;
}

// Get price prediction for a specific district and room count
price_prediction_t predict_prices(int district_id, int room_count) {
    printf("[STUB] predict_prices called for district %d, %d rooms\n", 
           district_id, room_count);
    
    price_prediction_t prediction;
    
    // Get the current average price based on district and room count
    double current_price = 0.0;
    if (district_id == 1) { // Botanica
        current_price = room_count == 1 ? 950.0 : 985.0;
    } else if (district_id == 2) { // Centru
        current_price = room_count == 1 ? 1100.0 : 1200.0;
    } else if (district_id == 3) { // Ciocana
        current_price = room_count == 1 ? 820.0 : 880.0;
    } else {
        current_price = 950.0; // Default
    }
    
    prediction.current_avg_price = current_price;
    prediction.prediction_6m = current_price * 1.035; // 3.5% increase in 6 months
    prediction.prediction_12m = current_price * 1.07;  // 7% increase in 12 months
    prediction.confidence = 0.85; // 85% confidence
    prediction.prediction_date = time(NULL); // Current date
    
    return prediction;
}

// Generate prediction based on linear regression
double linear_regression_predict(price_trend_point_t* data, int count, int months_ahead) {
    printf("[Implementation] linear_regression_predict called for %d data points, %d months ahead\n", 
           count, months_ahead);
    
    if (count < 2) {
        return 0.0; // Not enough data points
    }
    
    // Simple linear regression implementation
    // y = a + bx where:
    // b = sum((x_i - x_mean)(y_i - y_mean)) / sum((x_i - x_mean)^2)
    // a = y_mean - b * x_mean
    
    // Calculate x_mean and y_mean
    double x_sum = 0.0;
    double y_sum = 0.0;
    
    for (int i = 0; i < count; i++) {
        x_sum += i;
        y_sum += data[i].price;
    }
    
    double x_mean = x_sum / count;
    double y_mean = y_sum / count;
    
    // Calculate b (slope)
    double numerator = 0.0;
    double denominator = 0.0;
    
    for (int i = 0; i < count; i++) {
        double x_diff = i - x_mean;
        double y_diff = data[i].price - y_mean;
        
        numerator += x_diff * y_diff;
        denominator += x_diff * x_diff;
    }
    
    // Avoid division by zero
    double slope = (denominator != 0.0) ? numerator / denominator : 0.0;
    
    // Calculate a (intercept)
    double intercept = y_mean - slope * x_mean;
    
    // Predict price for months_ahead
    double predicted_price = intercept + slope * (count - 1 + months_ahead);
    
    // Apply seasonal adjustment (simplified)
    double seasonal_factor = 1.0;
    
    // Determine current month
    time_t now = time(NULL);
    struct tm* current_tm = localtime(&now);
    int current_month = current_tm->tm_mon;
    
    // Predict month (current + months_ahead)
    int target_month = (current_month + months_ahead) % 12;
    
    // Apply seasonal factors
    // Q1 (winter): slightly lower prices
    if (target_month >= 0 && target_month < 3) {
        seasonal_factor = 0.98;
    }
    // Q2 (spring): higher activity, higher prices
    else if (target_month >= 3 && target_month < 6) {
        seasonal_factor = 1.03;
    }
    // Q3 (summer): stable to slight increase
    else if (target_month >= 6 && target_month < 9) {
        seasonal_factor = 1.01;
    }
    // Q4 (fall): slightly lower activity
    else {
        seasonal_factor = 0.99;
    }
    
    // Apply seasonal adjustment
    predicted_price *= seasonal_factor;
    
    // Ensure prediction is positive
    return (predicted_price > 0) ? predicted_price : data[count-1].price;
}

// Calculate confidence level for the prediction
double calculate_prediction_confidence(price_trend_point_t* data, int count) {
    printf("[Implementation] calculate_prediction_confidence called for %d data points\n", count);
    
    // This calculates confidence based on:
    // 1. Amount of data available (more data = higher confidence)
    // 2. Consistency of trends (lower variance = higher confidence)
    // 3. Sample size information (larger samples = higher confidence)
    
    // Base confidence based on data count
    double data_confidence = 0.0;
    if (count < 6) {
        data_confidence = 0.60; // Limited data points
    } else if (count < 12) {
        data_confidence = 0.75; // Moderate amount of data
    } else if (count < 24) {
        data_confidence = 0.85; // Good amount of data
    } else {
        data_confidence = 0.90; // Excellent amount of data
    }
    
    // Calculate trend consistency (using coefficient of variation)
    double mean_price = 0.0;
    for (int i = 0; i < count; i++) {
        mean_price += data[i].price;
    }
    mean_price /= count;
    
    double sum_squared_diff = 0.0;
    for (int i = 0; i < count; i++) {
        double diff = data[i].price - mean_price;
        sum_squared_diff += diff * diff;
    }
    
    double std_dev = sqrt(sum_squared_diff / count);
    double coef_variation = (mean_price > 0) ? std_dev / mean_price : 1.0;
    
    // Convert coefficient of variation to a confidence factor
    // Lower variation (more consistent) = higher confidence
    double consistency_confidence = 1.0 - fmin(0.3, coef_variation);
    
    // Calculate sample size confidence
    double total_samples = 0.0;
    for (int i = 0; i < count; i++) {
        total_samples += data[i].sample_size;
    }
    double avg_sample_size = total_samples / count;
    
    // Convert average sample size to a confidence factor
    double sample_confidence = 0.0;
    if (avg_sample_size < 10) {
        sample_confidence = 0.70; // Small sample size
    } else if (avg_sample_size < 30) {
        sample_confidence = 0.80; // Medium sample size
    } else if (avg_sample_size < 50) {
        sample_confidence = 0.90; // Large sample size
    } else {
        sample_confidence = 0.95; // Very large sample size
    }
    
    // Combine the confidence factors (weighted average)
    double combined_confidence = 
        (data_confidence * 0.4) + 
        (consistency_confidence * 0.4) + 
        (sample_confidence * 0.2);
    
    // Ensure confidence is within [0.5, 0.95] range
    combined_confidence = fmax(0.5, fmin(0.95, combined_confidence));
    
    return combined_confidence;
}

// Handler for trend API endpoint
json_t* price_get_trends_handler(int district_id, int room_count, int months) {
    printf("[STUB] price_get_trends_handler called for district %d, %d rooms, %d months\n", 
           district_id, room_count, months);
    
    int count = 0;
    price_trend_point_t* trends = get_price_trends(district_id, room_count, months, &count);
    
    json_t* json_array = json_array();
    
    for (int i = 0; i < count; i++) {
        char date_str[11]; // YYYY-MM-DD format
        struct tm* tm_info = localtime(&trends[i].date);
        strftime(date_str, sizeof(date_str), "%Y-%m-%d", tm_info);
        
        json_t* point = json_object();
        json_object_set_new(point, "date", json_string(date_str));
        json_object_set_new(point, "price", json_real(trends[i].price));
        json_object_set_new(point, "sample_size", json_integer(trends[i].sample_size));
        
        json_array_append_new(json_array, point);
    }
    
    free(trends);
    return json_array;
}

// Handler for prediction API endpoint
json_t* price_get_predictions_handler(int district_id, int room_count) {
    printf("[STUB] price_get_predictions_handler called for district %d, %d rooms\n", 
           district_id, room_count);
    
    price_prediction_t prediction = predict_prices(district_id, room_count);
    
    char date_str[11]; // YYYY-MM-DD format
    struct tm* tm_info = localtime(&prediction.prediction_date);
    strftime(date_str, sizeof(date_str), "%Y-%m-%d", tm_info);
    
    json_t* json_obj = json_object();
    json_object_set_new(json_obj, "current_avg_price", json_real(prediction.current_avg_price));
    json_object_set_new(json_obj, "prediction_6m", json_real(prediction.prediction_6m));
    json_object_set_new(json_obj, "prediction_12m", json_real(prediction.prediction_12m));
    json_object_set_new(json_obj, "confidence", json_real(prediction.confidence));
    json_object_set_new(json_obj, "prediction_date", json_string(date_str));
    
    return json_obj;
}
