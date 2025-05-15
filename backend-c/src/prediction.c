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
    printf("[STUB] linear_regression_predict called for %d data points, %d months ahead\n", 
           count, months_ahead);
    
    if (count < 2) {
        return 0.0; // Not enough data points
    }
    
    // In a full implementation, this would contain actual linear regression logic
    // For the visual MVP, we'll return a simple projection
    double latest_price = data[count - 1].price;
    double first_price = data[0].price;
    
    // Calculate monthly growth rate
    double monthly_growth_rate = pow((latest_price / first_price), 1.0 / (count - 1)) - 1.0;
    
    // Apply growth rate for the prediction period
    return latest_price * pow(1.0 + monthly_growth_rate, months_ahead);
}

// Calculate confidence level for the prediction
double calculate_prediction_confidence(price_trend_point_t* data, int count) {
    printf("[STUB] calculate_prediction_confidence called for %d data points\n", count);
    
    // In a full implementation, this would analyze data quality and trend stability
    // For the visual MVP, return a fixed confidence based on data count
    if (count < 6) {
        return 0.6; // Limited confidence with few data points
    } else if (count < 12) {
        return 0.75; // Medium confidence
    } else {
        return 0.85; // Good confidence with 12+ months of data
    }
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
