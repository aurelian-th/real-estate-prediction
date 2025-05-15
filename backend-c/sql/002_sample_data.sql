-- Moldova Insight Realty MVP - Sample Data

-- Sample users with bcrypt hashed passwords (hash is for 'password123')
INSERT INTO users (email, password_hash, first_name, last_name, phone, is_admin) VALUES
('demo@example.com', '$2a$12$1InE4YmvFesVmOYeqGkNZOTQS4EJ3zD5UqA5Xet1cQ4IYqWy1iE0W', 'Demo', 'User', '+373 69 123 456', false),
('admin@moldovainsight.com', '$2a$12$1InE4YmvFesVmOYeqGkNZOTQS4EJ3zD5UqA5Xet1cQ4IYqWy1iE0W', 'Admin', 'User', '+373 69 789 012', true);

-- Districts with population and avg price data
INSERT INTO districts (name, description, population, avg_price_per_sqm, coordinates) VALUES
('Botanica', 'One of the largest and greenest districts in Chișinău, known for its botanical garden.', 145000, 950, point(47.0244, 28.8651)),
('Centru', 'The historical and administrative center of the city, with many cultural landmarks.', 95000, 1150, point(47.0229, 28.8353)),
('Ciocana', 'An industrial and residential district in the eastern part of Chișinău.', 105000, 850, point(47.0331, 28.8965)),
('Rîșcani', 'A primarily residential district with good educational institutions.', 125000, 900, point(47.0456, 28.8213)),
('Buiucani', 'A diverse district with both old and new residential areas and several parks.', 110000, 920, point(47.0401, 28.8079));

-- Property types
INSERT INTO property_types (name, description) VALUES
('Apartment', 'Residential unit in a multi-story building'),
('Studio', 'Small, self-contained apartment with combined living/sleeping area'),
('House', 'Standalone residential building'),
('Commercial', 'Property for business use'),
('Land', 'Undeveloped land parcel');

-- Property features
INSERT INTO property_features (name, category) VALUES
('Balcony', 'interior'),
('Garage', 'exterior'),
('Air Conditioning', 'facility'),
('Central Heating', 'facility'),
('Renovated', 'interior'),
('Furnished', 'interior'),
('Elevator', 'facility'),
('Storage Room', 'interior'),
('Parking', 'exterior'),
('Security System', 'facility'),
('Public Transport Nearby', 'location'),
('Schools Nearby', 'location'),
('Parks Nearby', 'location'),
('Shopping Nearby', 'location');

-- Sample properties
INSERT INTO properties (district_id, title, address, type_id, num_rooms, area_sqm, price, currency, floor, total_floors, year_built, description, coordinates, status) VALUES
-- Botanica Properties
(1, 'Modern 2-Room Apartment near Botanica Park', 'Strada Independenței 12, Botanica', 1, 2, 58, 55000, 'EUR', 3, 9, 2010, 'Newly renovated apartment with modern furnishings, walking distance to Botanica Park and public transport.', point(47.0254, 28.8601), 'active'),
(1, 'Spacious 3-Room Apartment with Garage', 'Strada Sarmizegetusa 43, Botanica', 1, 3, 75, 67000, 'EUR', 5, 10, 2005, 'Spacious family apartment with garage, storage room, and newly installed appliances.', point(47.0214, 28.8623), 'active'),
(1, 'Cozy 1-Room Studio in Botanica', 'Strada Cuza-Vodă 77, Botanica', 2, 1, 38, 33000, 'EUR', 2, 5, 1990, 'Perfect starter home or investment property, close to all amenities.', point(47.0274, 28.8683), 'active'),

-- Centru Properties
(2, 'Premium 2-Room Apartment in City Center', 'Strada Mitropolit Varlaam 58, Centru', 1, 2, 62, 75000, 'EUR', 4, 7, 2015, 'Luxurious apartment in the heart of Chișinău with high-end finishes and appliances.', point(47.0251, 28.8312), 'active'),
(2, 'Elegant 3-Room Apartment with City Views', 'Bulevardul Ștefan cel Mare 102, Centru', 1, 3, 85, 92000, 'EUR', 8, 12, 2018, 'Spacious apartment with panoramic city views, premium finishes, and modern design.', point(47.0219, 28.8343), 'active'),
(2, 'Historical Studio in Old Town', 'Strada Alexandru cel Bun 28, Centru', 2, 1, 42, 48000, 'EUR', 3, 4, 1960, 'Charming studio in a historical building, recently renovated with preserved architectural elements.', point(47.0239, 28.8363), 'pending'),

-- Ciocana Properties
(3, 'Affordable 2-Room Apartment in Ciocana', 'Bulevardul Mircea cel Bătrân 4, Ciocana', 1, 2, 55, 42000, 'EUR', 6, 9, 1985, 'Well-maintained apartment with good layout and plenty of natural light.', point(47.0321, 28.8935), 'active'),
(3, 'Family 3-Room Apartment with Playground', 'Strada Igor Vieru 15, Ciocana', 1, 3, 68, 55000, 'EUR', 2, 9, 1992, 'Ideal family apartment close to schools, with a playground in the courtyard.', point(47.0341, 28.8985), 'active'),

-- Rîșcani Properties
(4, 'Modern 2-Room Apartment near University', 'Strada Alecu Russo 55, Rîșcani', 1, 2, 53, 49000, 'EUR', 4, 9, 2000, 'Contemporary apartment located near the Technical University, ideal for students or young professionals.', point(47.0426, 28.8223), 'active'),
(4, 'Spacious House with Garden in Rîșcani', 'Strada Matei Basarab 25, Rîșcani', 3, 4, 120, 135000, 'EUR', 1, 2, 1995, 'Detached house with a beautiful garden and terrace, in a quiet neighborhood.', point(47.0476, 28.8243), 'active'),

-- Buiucani Properties
(5, 'Bright 2-Room Apartment in Buiucani', 'Strada Ion Creangă 32, Buiucani', 1, 2, 56, 52000, 'EUR', 5, 9, 2002, 'Sunny apartment with a well-designed layout and quality finishes.', point(47.0381, 28.8049), 'active'),
(5, 'Luxury 4-Room Penthouse in Buiucani', 'Strada Alba Iulia 77, Buiucani', 1, 4, 140, 175000, 'EUR', 10, 10, 2020, 'Exclusive penthouse with panoramic views, high ceilings, and premium amenities.', point(47.0421, 28.8089), 'active');

-- Property images
INSERT INTO property_images (property_id, image_url, is_primary) VALUES
(1, 'botanical_apt1_main.jpg', true),
(1, 'botanical_apt1_living.jpg', false),
(1, 'botanical_apt1_kitchen.jpg', false),
(2, 'botanical_apt2_main.jpg', true),
(2, 'botanical_apt2_bedroom.jpg', false),
(3, 'botanical_studio_main.jpg', true),
(4, 'centru_apt1_main.jpg', true),
(4, 'centru_apt1_view.jpg', false),
(5, 'centru_apt2_main.jpg', true),
(6, 'centru_studio_main.jpg', true);

-- Property features
INSERT INTO property_to_features (property_id, feature_id) VALUES
(1, 1), -- Balcony
(1, 5), -- Renovated
(1, 6), -- Furnished
(1, 11), -- Public Transport Nearby
(2, 2), -- Garage
(2, 8), -- Storage Room
(3, 5), -- Renovated
(3, 11), -- Public Transport Nearby
(3, 14), -- Shopping Nearby
(4, 1), -- Balcony
(4, 3), -- Air Conditioning
(4, 4), -- Central Heating
(4, 7), -- Elevator
(5, 1), -- Balcony
(5, 3), -- Air Conditioning
(5, 6); -- Furnished

-- User saved searches
INSERT INTO user_saved_searches (user_id, name, search_params) VALUES
(1, 'Botanica 2-rooms', '{"district_id": 1, "num_rooms": 2, "max_price": 60000}'),
(1, 'Centru investment', '{"district_id": 2, "num_rooms": 1, "max_price": 50000}');

-- User saved properties
INSERT INTO user_saved_properties (user_id, property_id) VALUES
(1, 1),
(1, 4),
(1, 6);

-- Historical price data
INSERT INTO price_history (district_id, room_count, date, avg_price_per_sqm, sample_size) VALUES
-- Botanica 2-room historical data (monthly for 24 months)
(1, 2, '2023-05-01', 890, 45),
(1, 2, '2023-06-01', 895, 42),
(1, 2, '2023-07-01', 898, 39),
(1, 2, '2023-08-01', 905, 41),
(1, 2, '2023-09-01', 908, 40),
(1, 2, '2023-10-01', 910, 43),
(1, 2, '2023-11-01', 915, 38),
(1, 2, '2023-12-01', 918, 35),
(1, 2, '2024-01-01', 922, 37),
(1, 2, '2024-02-01', 925, 42),
(1, 2, '2024-03-01', 930, 45),
(1, 2, '2024-04-01', 935, 44),
(1, 2, '2024-05-01', 940, 46),
(1, 2, '2024-06-01', 945, 48),
(1, 2, '2024-07-01', 948, 42),
(1, 2, '2024-08-01', 952, 41),
(1, 2, '2024-09-01', 955, 45),
(1, 2, '2024-10-01', 960, 47),
(1, 2, '2024-11-01', 963, 44),
(1, 2, '2024-12-01', 967, 42),
(1, 2, '2025-01-01', 972, 43),
(1, 2, '2025-02-01', 975, 47),
(1, 2, '2025-03-01', 980, 46),
(1, 2, '2025-04-01', 985, 48),

-- Centru 2-room historical data (monthly for last 12 months)
(2, 2, '2024-05-01', 1085, 32),
(2, 2, '2024-06-01', 1090, 30),
(2, 2, '2024-07-01', 1095, 33),
(2, 2, '2024-08-01', 1100, 34),
(2, 2, '2024-09-01', 1105, 31),
(2, 2, '2024-10-01', 1110, 33),
(2, 2, '2024-11-01', 1115, 30),
(2, 2, '2024-12-01', 1120, 28),
(2, 2, '2025-01-01', 1125, 32),
(2, 2, '2025-02-01', 1130, 34),
(2, 2, '2025-03-01', 1135, 35),
(2, 2, '2025-04-01', 1140, 36);

-- Price predictions
INSERT INTO price_predictions (district_id, room_count, prediction_date, predicted_price_per_sqm, confidence_level, algorithm) VALUES
-- Botanica 2-room predictions
(1, 2, '2025-11-01', 1008, 85.5, 'linear_regression'),
(1, 2, '2026-05-01', 1035, 77.2, 'linear_regression'),

-- Centru 2-room predictions
(2, 2, '2025-11-01', 1180, 83.1, 'linear_regression'),
(2, 2, '2026-05-01', 1215, 75.6, 'linear_regression');
