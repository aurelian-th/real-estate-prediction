
    export const mockUser = {
        userId: 'mock-user-id-123',
        email: 'demo@example.com',
        fullName: 'Demo User',
    };

    export const mockDistricts = [
        { district_id: 1, name: 'Centru', description: 'The central district of Chișinău, hub for business and culture.', average_price_sqm: 1200.00 },
        { district_id: 2, name: 'Botanica', description: 'A large residential district with parks and green spaces.', average_price_sqm: 950.00 },
        { district_id: 3, name: 'Râșcani', description: 'A diverse district with residential areas and industrial zones.', average_price_sqm: 900.00 },
        { district_id: 4, name: 'Ciocana', description: 'A relatively newer district with many apartment blocks.', average_price_sqm: 850.00 },
        { district_id: 5, name: 'Buiucani', description: 'Known for its green areas and a mix of old and new buildings.', average_price_sqm: 920.00 },
    ];

    export const mockProperties = [
        { property_id: 'prop-uuid-001', district_id: 1, district_name: 'Centru', address: 'Str. Stefan cel Mare 1, Apt. 10', num_rooms: 3, area_sqm: 75.5, price: 90000, description: 'Spacious apartment in the heart of the city. Renovated, great view.', property_type: 'Apartment', year_built: 1985, floor: 3, total_floors: 9, amenities: ['balcony', 'renovated'], source_url: 'http://example.com/prop1', date_listed: '2024-03-01', latitude: 47.0210, longitude: 28.8320 },
        { property_id: 'prop-uuid-002', district_id: 2, district_name: 'Botanica', address: 'Bd. Dacia 20, Apt. 5', num_rooms: 2, area_sqm: 55.0, price: 52000, description: 'Cozy apartment near the park. Perfect for a small family or couple.', property_type: 'Apartment', year_built: 1992, floor: 2, total_floors: 5, amenities: ['furnished', 'central_heating'], source_url: 'http://example.com/prop2', date_listed: '2024-03-15', latitude: 46.9915, longitude: 28.8590 },
        { property_id: 'prop-uuid-003', district_id: 3, district_name: 'Râșcani', address: 'Str. Miron Costin 5, Apt. 12', num_rooms: 1, area_sqm: 40.2, price: 38000, description: 'Compact studio, good for students or single professionals. New building.', property_type: 'Apartment', year_built: 2005, floor: 4, total_floors: 10, amenities: ['new_building', 'elevator'], source_url: 'http://example.com/prop3', date_listed: '2024-04-01', latitude: 47.0412, longitude: 28.8585 },
        { property_id: 'prop-uuid-004', district_id: 4, district_name: 'Ciocana', address: 'Str. Mircea cel Batran 15, Apt. 25', num_rooms: 4, area_sqm: 90.0, price: 75000, description: 'Large family apartment with great views and nearby playground.', property_type: 'Apartment', year_built: 2010, floor: 8, total_floors: 12, amenities: ['balcony', 'playground_nearby'], source_url: 'http://example.com/prop4', date_listed: '2024-02-20', latitude: 47.0490, longitude: 28.8900 },
        { property_id: 'prop-uuid-005', district_id: 5, district_name: 'Buiucani', address: 'Str. Alba Iulia 77, Apt. 1', num_rooms: 2, area_sqm: 60.5, price: 58000, description: 'Renovated apartment in a quiet area with dedicated parking space.', property_type: 'Apartment', year_built: 1978, floor: 1, total_floors: 4, amenities: ['renovated', 'parking_space'], source_url: 'http://example.com/prop5', date_listed: '2024-03-10', latitude: 47.0300, longitude: 28.7950 },
        { property_id: 'prop-uuid-006', district_id: 2, district_name: 'Botanica', address: 'Str. Independentei 50, Apt. 33', num_rooms: 2, area_sqm: 58.0, price: 54000, description: 'Bright 2-room apartment in Botanica, recently refreshed.', property_type: 'Apartment', year_built: 1995, floor: 7, total_floors: 9, amenities: ['balcony', 'elevator'], source_url: 'http://example.com/prop6', date_listed: '2024-01-10', latitude: 46.9900, longitude: 28.8600 },
        { property_id: 'prop-uuid-007', district_id: 2, district_name: 'Botanica', address: 'Bd. Cuza Voda 10, Apt. 15', num_rooms: 3, area_sqm: 72.0, price: 68000, description: '3-room apartment, needs cosmetic repair. Great potential.', property_type: 'Apartment', year_built: 1988, floor: 4, total_floors: 9, amenities: [], source_url: 'http://example.com/prop7', date_listed: '2023-12-05', latitude: 46.9850, longitude: 28.8550 },
        { property_id: 'prop-uuid-008', district_id: 1, district_name: 'Centru', address: 'Str. Eminescu 50, Apt. 8', num_rooms: 2, area_sqm: 65.0, price: 85000, description: 'Modern 2-room in new building, Centru. Includes underground parking.', property_type: 'Apartment', year_built: 2018, floor: 5, total_floors: 10, amenities: ['new_building', 'underground_parking', 'elevator'], source_url: 'http://example.com/prop8', date_listed: '2024-02-01', latitude: 47.0250, longitude: 28.8350 },
    ];

    export const mockTrendsBotanica2Rooms = {
        districtName: 'Botanica',
        numRooms: 2,
        propertyType: 'Apartment',
        trendData: [
            { date: '2023-01', price: 51000, price_sqm: 930.00 }, { date: '2023-02', price: 51200, price_sqm: 935.00 },
            { date: '2023-03', price: 51500, price_sqm: 940.00 }, { date: '2023-04', price: 51800, price_sqm: 945.00 },
            { date: '2023-05', price: 52000, price_sqm: 950.00 }, { date: '2023-06', price: 52300, price_sqm: 955.00 },
            { date: '2023-07', price: 52500, price_sqm: 960.00 }, { date: '2023-08', price: 52400, price_sqm: 958.00 },
            { date: '2023-09', price: 52700, price_sqm: 962.00 }, { date: '2023-10', price: 53000, price_sqm: 965.00 },
            { date: '2023-11', price: 53200, price_sqm: 970.00 }, { date: '2023-12', price: 53500, price_sqm: 975.00 },
        ]
    };
     export const mockTrendsCentru3Rooms = {
        districtName: 'Centru',
        numRooms: 3,
        propertyType: 'Apartment',
        trendData: [
            { date: '2023-01', price: 88000, price_sqm: 1180.00 }, { date: '2023-02', price: 88500, price_sqm: 1185.00 },
            { date: '2023-03', price: 89000, price_sqm: 1190.00 }, { date: '2023-04', price: 89200, price_sqm: 1193.00 },
            { date: '2023-05', price: 89500, price_sqm: 1198.00 }, { date: '2023-06', price: 90000, price_sqm: 1200.00 },
            { date: '2023-07', price: 90200, price_sqm: 1202.00 }, { date: '2023-08', price: 90000, price_sqm: 1200.00 },
            { date: '2023-09', price: 90500, price_sqm: 1205.00 }, { date: '2023-10', price: 90800, price_sqm: 1208.00 },
            { date: '2023-11', price: 91000, price_sqm: 1210.00 }, { date: '2023-12', price: 91500, price_sqm: 1215.00 },
        ]
    };


    export const mockPredictionBotanica2Rooms = {
        districtName: 'Botanica',
        numRooms: 2,
        propertyType: 'Apartment',
        currentAveragePrice: 53500, // Last known average
        prediction_6m_percentage: 1.5, // Positive for increase, negative for decrease
        prediction_12m_percentage: 2.5,
        confidence: 0.75, // 0 to 1
        analysis: "The market for 2-room apartments in Botanica shows a steady upward trend over the past year. Current indicators suggest a continued modest price increase over the next 6 to 12 months, driven by consistent demand and limited new supply in this segment."
    };

     export const mockPredictionCentru3Rooms = {
        districtName: 'Centru',
        numRooms: 3,
        propertyType: 'Apartment',
        currentAveragePrice: 91500,
        prediction_6m_percentage: 0.8,
        prediction_12m_percentage: 1.2,
        confidence: 0.80,
        analysis: "3-room apartments in Centru have seen stable growth. The outlook remains positive with slight appreciation expected. Premium location continues to drive value."
    };


    export const mockSavedSearches = [
        { search_id: 'search-uuid-001', user_id: 'mock-user-id-123', search_name: 'Botanica 2-Room Apartments', filters: { district_id: 2, num_rooms: 2, min_price: 45000, max_price: 60000 }, created_at: '2024-05-01T10:00:00Z' },
        { search_id: 'search-uuid-002', user_id: 'mock-user-id-123', search_name: 'Centru Apartments under 100k', filters: { district_id: 1, max_price: 100000 }, created_at: '2024-04-15T14:30:00Z' },
    ];
