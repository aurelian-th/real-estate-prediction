-- backend-c/sql/001_schema.sql
  -- Database Schema for Moldova Insight Realty

  -- Enable UUID generation
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  -- Users Table
  CREATE TABLE IF NOT EXISTS users (
      user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords
      full_name VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Districts Table (Sectors of Chișinău)
  CREATE TABLE IF NOT EXISTS districts (
      district_id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      average_price_sqm NUMERIC(10, 2) -- Example general metric
  );

  -- Properties Table
  CREATE TABLE IF NOT EXISTS properties (
      property_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      district_id INT NOT NULL REFERENCES districts(district_id),
      address VARCHAR(255) NOT NULL,
      num_rooms INT NOT NULL,
      area_sqm NUMERIC(8, 2) NOT NULL,
      price NUMERIC(12, 2) NOT NULL,
      description TEXT,
      property_type VARCHAR(50) DEFAULT 'Apartment', -- e.g., Apartment, House, Commercial
      year_built INT,
      floor INT,
      total_floors INT,
      amenities TEXT[], -- e.g., {'balcony', 'renovated', 'furnished'}
      source_url TEXT, -- URL from where it was scraped (e.g., 999.md)
      scraped_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      date_listed DATE, -- The original listing date if available
      is_active BOOLEAN DEFAULT TRUE,
      latitude NUMERIC(9, 6),
      longitude NUMERIC(9, 6)
  );

  -- Price History Table (for tracking trends)
  -- This would be populated by aggregating data or from historical scrapes
  CREATE TABLE IF NOT EXISTS price_history (
      history_id SERIAL PRIMARY KEY,
      district_id INT NOT NULL REFERENCES districts(district_id),
      num_rooms INT, -- Can be NULL if it's a general district trend
      property_type VARCHAR(50), -- Can be NULL
      month_year DATE NOT NULL, -- Store as the first day of the month
      average_price_sqm NUMERIC(10, 2),
      median_price NUMERIC(12, 2),
      listings_count INT,
      UNIQUE(district_id, num_rooms, property_type, month_year)
  );

  -- Saved Searches Table (for registered users)
  CREATE TABLE IF NOT EXISTS saved_searches (
      search_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL REFERENCES users(user_id),
      search_name VARCHAR(255),
      filters JSONB, -- Store filter criteria as JSON
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

  -- Predictions Table (Store model predictions)
  CREATE TABLE IF NOT EXISTS predictions (
      prediction_id SERIAL PRIMARY KEY,
      district_id INT NOT NULL REFERENCES districts(district_id),
      num_rooms INT,
      property_type VARCHAR(50),
      prediction_date DATE NOT NULL, -- Date for which prediction is made
      predicted_price_change_6m_percentage NUMERIC(5,2), -- e.g., 1.5% increase
      predicted_price_change_12m_percentage NUMERIC(5,2),
      confidence_level NUMERIC(3,2), -- e.g., 0.85
      model_version VARCHAR(50),
      generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(district_id, num_rooms, property_type, prediction_date, model_version)
  );

  -- Trigger to update 'updated_at' timestamp on user update
  CREATE OR REPLACE FUNCTION update_modified_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
  END;
  $$ language 'plpgsql';

  CREATE TRIGGER update_user_modtime
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_modified_column();

  -- Indexes for performance
  CREATE INDEX IF NOT EXISTS idx_properties_district_id ON properties(district_id);
  CREATE INDEX IF NOT EXISTS idx_properties_num_rooms ON properties(num_rooms);
  CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
  CREATE INDEX IF NOT EXISTS idx_price_history_district_month_year ON price_history(district_id, month_year);

  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
  -- backend-c/sql/002_sample_data.sql
  -- Sample Data for Moldova Insight Realty

  -- Sample Districts (Chișinău Sectors)
  INSERT INTO districts (name, description, average_price_sqm) VALUES
  ('Centru', 'The central district of Chișinău, hub for business and culture.', 1200.00),
  ('Botanica', 'A large residential district with parks and green spaces.', 950.00),
  ('Râșcani', 'A diverse district with residential areas and industrial zones.', 900.00),
  ('Ciocana', 'A relatively newer district with many apartment blocks.', 850.00),
  ('Buiucani', 'Known for its green areas and a mix of old and new buildings.', 920.00)
  ON CONFLICT (name) DO NOTHING;

  -- Sample Properties (linking to district_id by name subquery for robustness)
  -- Ensure these are inserted AFTER districts
  DO $$
  DECLARE
      centru_id INT;
      botanica_id INT;
      rascani_id INT;
      ciocana_id INT;
      buiucani_id INT;
  BEGIN
      SELECT district_id INTO centru_id FROM districts WHERE name = 'Centru';
      SELECT district_id INTO botanica_id FROM districts WHERE name = 'Botanica';
      SELECT district_id INTO rascani_id FROM districts WHERE name = 'Râșcani';
      SELECT district_id INTO ciocana_id FROM districts WHERE name = 'Ciocana';
      SELECT district_id INTO buiucani_id FROM districts WHERE name = 'Buiucani';

      INSERT INTO properties (district_id, address, num_rooms, area_sqm, price, description, property_type, year_built, floor, total_floors, amenities, source_url, date_listed, latitude, longitude) VALUES
      (centru_id, 'Str. Stefan cel Mare 1, Apt. 10', 3, 75.5, 90000, 'Spacious apartment in the heart of the city.', 'Apartment', 1985, 3, 9, '{"balcony", "renovated"}', 'http://example.com/prop1', '2024-03-01', 47.0210, 28.8320),
      (botanica_id, 'Bd. Dacia 20, Apt. 5', 2, 55.0, 52000, 'Cozy apartment near the park.', 'Apartment', 1992, 2, 5, '{"furnished", "central_heating"}', 'http://example.com/prop2', '2024-03-15', 46.9915, 28.8590),
      (rascani_id, 'Str. Miron Costin 5, Apt. 12', 1, 40.2, 38000, 'Compact studio, good for students.', 'Apartment', 2005, 4, 10, '{"new_building", "elevator"}', 'http://example.com/prop3', '2024-04-01', 47.0412, 28.8585),
      (ciocana_id, 'Str. Mircea cel Batran 15, Apt. 25', 4, 90.0, 75000, 'Large family apartment with great views.', 'Apartment', 2010, 8, 12, '{"balcony", "playground_nearby"}', 'http://example.com/prop4', '2024-02-20', 47.0490, 28.8900),
      (buiucani_id, 'Str. Alba Iulia 77, Apt. 1', 2, 60.5, 58000, 'Renovated apartment in a quiet area.', 'Apartment', 1978, 1, 4, '{"renovated", "parking_space"}', 'http://example.com/prop5', '2024-03-10', 47.0300, 28.7950),
      (botanica_id, 'Str. Independentei 50, Apt. 33', 2, 58.0, 54000, 'Bright 2-room apartment in Botanica.', 'Apartment', 1995, 7, 9, '{"balcony", "elevator"}', 'http://example.com/prop6', '2024-01-10', 46.9900, 28.8600),
      (botanica_id, 'Bd. Cuza Voda 10, Apt. 15', 3, 72.0, 68000, '3-room apartment, needs cosmetic repair.', 'Apartment', 1988, 4, 9, '{}', 'http://example.com/prop7', '2023-12-05', 46.9850, 28.8550),
      (centru_id, 'Str. Eminescu 50, Apt. 8', 2, 65.0, 85000, 'Modern 2-room in new building, Centru.', 'Apartment', 2018, 5, 10, '{"new_building", "underground_parking"}', 'http://example.com/prop8', '2024-02-01', 47.0250, 28.8350);
  END $$;

  -- Sample Price History (Manually crafted for Botanica, 2 rooms for demo)
  DO $$
  DECLARE
      botanica_id_hist INT;
  BEGIN
      SELECT district_id INTO botanica_id_hist FROM districts WHERE name = 'Botanica';

      INSERT INTO price_history (district_id, num_rooms, property_type, month_year, average_price_sqm, median_price, listings_count) VALUES
      (botanica_id_hist, 2, 'Apartment', '2023-01-01', 930.00, 51000, 15),
      (botanica_id_hist, 2, 'Apartment', '2023-02-01', 935.00, 51200, 18),
      (botanica_id_hist, 2, 'Apartment', '2023-03-01', 940.00, 51500, 20),
      (botanica_id_hist, 2, 'Apartment', '2023-04-01', 945.00, 51800, 17),
      (botanica_id_hist, 2, 'Apartment', '2023-05-01', 950.00, 52000, 22),
      (botanica_id_hist, 2, 'Apartment', '2023-06-01', 955.00, 52300, 19),
      (botanica_id_hist, 2, 'Apartment', '2023-07-01', 960.00, 52500, 21),
      (botanica_id_hist, 2, 'Apartment', '2023-08-01', 958.00, 52400, 16),
      (botanica_id_hist, 2, 'Apartment', '2023-09-01', 962.00, 52700, 20),
      (botanica_id_hist, 2, 'Apartment', '2023-10-01', 965.00, 53000, 23),
      (botanica_id_hist, 2, 'Apartment', '2023-11-01', 970.00, 53200, 18),
      (botanica_id_hist, 2, 'Apartment', '2023-12-01', 975.00, 53500, 20)
      ON CONFLICT (district_id, num_rooms, property_type, month_year) DO NOTHING;
  END $$;

  -- Sample Predictions (Manually crafted for Botanica, 2 rooms for demo)
  DO $$
  DECLARE
      botanica_id_pred INT;
  BEGIN
      SELECT district_id INTO botanica_id_pred FROM districts WHERE name = 'Botanica';

      INSERT INTO predictions (district_id, num_rooms, property_type, prediction_date, predicted_price_change_6m_percentage, predicted_price_change_12m_percentage, confidence_level, model_version) VALUES
      (botanica_id_pred, 2, 'Apartment', (SELECT CURRENT_DATE + INTERVAL '6 months'), 1.5, 2.5, 0.75, 'basic_linear_v0.1'),
      (botanica_id_pred, 2, 'Apartment', (SELECT CURRENT_DATE + INTERVAL '12 months'), 2.5, 4.0, 0.70, 'basic_linear_v0.1')
      ON CONFLICT (district_id, num_rooms, property_type, prediction_date, model_version) DO NOTHING;
  END $$;

  -- Sample User (for login demo)
  -- Password is "password123" - HASH THIS WITH YOUR CHOSEN C LIBRARY LATER
  -- For now, storing plain, but this is NOT for production.
  -- In a real C backend, you'd hash it before inserting.
  -- Example using pgcrypto for a placeholder hash (requires pgcrypto extension enabled: CREATE EXTENSION pgcrypto;)
  -- For the MVP demo, the frontend will mock the login against "demo@example.com" / "password123"
  -- INSERT INTO users (email, password_hash, full_name) VALUES
  -- ('demo@example.com', crypt('password123', gen_salt('bf', 8)), 'Demo User')
  -- ON CONFLICT (email) DO NOTHING;
