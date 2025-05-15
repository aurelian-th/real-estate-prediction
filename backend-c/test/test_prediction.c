#include "../src/include/prediction.h"
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <math.h>
#include <time.h>

// Test utility functions
void print_separator() {
    printf("\n--------------------------------------------------\n");
}

void print_test_header(const char* test_name) {
    print_separator();
    printf("TEST: %s\n", test_name);
    print_separator();
}

// Helper to create mock trend data for testing
price_trend_point_t* create_mock_trend_data(int count, double base_price, double growth_rate, int* out_count) {
    price_trend_point_t* data = malloc(sizeof(price_trend_point_t) * count);
    
    time_t now = time(NULL);
    struct tm* current_tm = localtime(&now);
    current_tm->tm_year -= 1; // Start one year ago
    
    for (int i = 0; i < count; i++) {
        // Move forward one month for each data point
        current_tm->tm_mon += 1;
        if (current_tm->tm_mon > 11) {
            current_tm->tm_mon = 0;
            current_tm->tm_year += 1;
        }
        
        data[i].date = mktime(current_tm);
        data[i].district_id = 1; // Botanica
        data[i].room_count = 2;  // 2 rooms
        data[i].price = base_price * pow(1 + growth_rate, i);
        data[i].sample_size = 30 + (rand() % 20); // Random sample size between 30-50
    }
    
    *out_count = count;
    return data;
}

// Test get_price_trends function
void test_get_price_trends() {
    print_test_header("get_price_trends");
    
    int count = 0;
    price_trend_point_t* trends = get_price_trends(1, 2, 12, &count);
    
    printf("Retrieved %d data points for district 1, 2 rooms\n", count);
    assert(count > 0 && "Should return at least one data point");
    
    printf("First data point: price = %.2f, sample size = %d\n", 
           trends[0].price, trends[0].sample_size);
    printf("Last data point: price = %.2f, sample size = %d\n", 
           trends[count-1].price, trends[count-1].sample_size);
    
    // Verify trend is in expected range for Botanica 2-room properties
    assert(trends[0].price >= 800 && trends[0].price <= 1000 && 
           "Initial price should be in expected range");
    
    free(trends);
    printf("Test passed!\n");
}

// Test linear_regression_predict function
void test_linear_regression_predict() {
    print_test_header("linear_regression_predict");
    
    int count = 0;
    double base_price = 900.0;
    double growth_rate = 0.005; // 0.5% monthly growth (about 6.2% annual)
    
    // Create synthetic data with known growth rate
    price_trend_point_t* data = create_mock_trend_data(12, base_price, growth_rate, &count);
    
    // Predict 6 months ahead
    double prediction_6m = linear_regression_predict(data, count, 6);
    
    // Calculate expected price at 6 months with the same growth rate
    double expected_6m = base_price * pow(1 + growth_rate, count + 6);
    
    printf("Actual 12-month price: %.2f\n", data[count-1].price);
    printf("Predicted price (6 months ahead): %.2f\n", prediction_6m);
    printf("Expected price (6 months ahead): %.2f\n", expected_6m);
    
    // Allow for some deviation due to seasonal adjustments and rounding
    double allowed_deviation = 0.05; // 5%
    double deviation = fabs(prediction_6m - expected_6m) / expected_6m;
    
    printf("Deviation from expected: %.2f%%\n", deviation * 100);
    assert(deviation <= allowed_deviation && 
           "Prediction should be within allowed deviation from expected value");
    
    free(data);
    printf("Test passed!\n");
}

// Test calculate_prediction_confidence function
void test_calculate_prediction_confidence() {
    print_test_header("calculate_prediction_confidence");
    
    int count1 = 0, count2 = 0;
    double base_price = 900.0;
    double growth_rate = 0.005; // 0.5% monthly growth
    
    // Create two datasets with different sizes
    price_trend_point_t* data1 = create_mock_trend_data(6, base_price, growth_rate, &count1); // 6 months
    price_trend_point_t* data2 = create_mock_trend_data(24, base_price, growth_rate, &count2); // 24 months
    
    double confidence1 = calculate_prediction_confidence(data1, count1);
    double confidence2 = calculate_prediction_confidence(data2, count2);
    
    printf("Confidence with 6 months of data: %.2f\n", confidence1);
    printf("Confidence with 24 months of data: %.2f\n", confidence2);
    
    // More data should result in higher confidence
    assert(confidence2 > confidence1 && 
           "More data should result in higher confidence");
    
    // Confidence should be in valid range
    assert(confidence1 >= 0.5 && confidence1 <= 0.95 && 
           "Confidence should be in valid range");
    assert(confidence2 >= 0.5 && confidence2 <= 0.95 && 
           "Confidence should be in valid range");
    
    free(data1);
    free(data2);
    printf("Test passed!\n");
}

// Test predict_prices function
void test_predict_prices() {
    print_test_header("predict_prices");
    
    price_prediction_t prediction = predict_prices(1, 2); // Botanica, 2 rooms
    
    printf("Current average price: %.2f\n", prediction.current_avg_price);
    printf("6-month prediction: %.2f\n", prediction.prediction_6m);
    printf("12-month prediction: %.2f\n", prediction.prediction_12m);
    printf("Confidence: %.2f\n", prediction.confidence);
    
    // Basic sanity checks
    assert(prediction.current_avg_price > 0 && 
           "Current price should be positive");
    assert(prediction.prediction_6m > prediction.current_avg_price && 
           "6-month prediction should be higher than current price (assuming growth)");
    assert(prediction.prediction_12m > prediction.prediction_6m && 
           "12-month prediction should be higher than 6-month prediction (assuming growth)");
    assert(prediction.confidence >= 0.0 && prediction.confidence <= 1.0 && 
           "Confidence should be between 0 and 1");
    
    printf("Test passed!\n");
}

// Main test function
int main() {
    printf("Starting prediction module tests...\n");
    
    // Run tests
    test_get_price_trends();
    test_linear_regression_predict();
    test_calculate_prediction_confidence();
    test_predict_prices();
    
    print_separator();
    printf("All tests passed!\n");
    return 0;
}
