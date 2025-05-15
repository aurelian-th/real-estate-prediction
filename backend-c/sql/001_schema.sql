-- Moldova Insight Realty MVP - Database Schema

-- Users table for authentication and user management
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Districts (sectors) of Chișinău
CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT,
    population INTEGER,
    avg_price_per_sqm INTEGER,
    coordinates POINT,  -- For map visualization
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property types (apartment, house, commercial, etc.)
CREATE TABLE property_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description TEXT
);

-- Property features (amenities, characteristics)
CREATE TABLE property_features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    category VARCHAR(64)  -- e.g. 'interior', 'exterior', 'facility'
);

-- Main properties table
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    district_id INTEGER REFERENCES districts(id),
    title VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    type_id INTEGER REFERENCES property_types(id),
    num_rooms INTEGER NOT NULL,
    area_sqm INTEGER NOT NULL,
    price INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    floor INTEGER,
    total_floors INTEGER,
    year_built INTEGER,
    description TEXT,
    coordinates POINT,
    status VARCHAR(20) DEFAULT 'active',  -- 'active', 'sold', 'pending'
    date_listed DATE DEFAULT CURRENT_DATE,
    date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Property images
CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for property features
CREATE TABLE property_to_features (
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    feature_id INTEGER REFERENCES property_features(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, feature_id)
);

-- Saved searches for users
CREATE TABLE user_saved_searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100),
    search_params JSONB NOT NULL,  -- Store search filters as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved/favorite properties for users
CREATE TABLE user_saved_properties (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, property_id)
);

-- Historic price data by district and property type
CREATE TABLE price_history (
    id SERIAL PRIMARY KEY,
    district_id INTEGER REFERENCES districts(id),
    room_count INTEGER,
    date DATE NOT NULL,
    avg_price_per_sqm INTEGER NOT NULL,
    sample_size INTEGER,  -- Number of properties used in the calculation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Price predictions for the future
CREATE TABLE price_predictions (
    id SERIAL PRIMARY KEY,
    district_id INTEGER REFERENCES districts(id),
    room_count INTEGER,
    prediction_date DATE NOT NULL,  -- Future date this prediction is for
    predicted_price_per_sqm INTEGER NOT NULL,
    confidence_level DECIMAL(5,2),  -- 0-100%
    algorithm VARCHAR(100),  -- The algorithm used for prediction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_properties_district ON properties(district_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_date_listed ON properties(date_listed);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_num_rooms ON properties(num_rooms);
CREATE INDEX idx_price_history_date ON price_history(date);
CREATE INDEX idx_price_predictions_date ON price_predictions(prediction_date);
