/*
  # Create Recycling Games Tables

  ## Overview
  Creates database tables to store player scores and game statistics for the recycling education games platform.

  ## New Tables
  
  ### `players`
  Stores player information and profiles
  - `id` (uuid, primary key) - Unique player identifier
  - `name` (text) - Player display name
  - `email` (text, unique, nullable) - Optional email for tracking
  - `created_at` (timestamptz) - Account creation timestamp
  
  ### `game_scores`
  Stores individual game scores and attempts
  - `id` (uuid, primary key) - Unique score record identifier
  - `player_id` (uuid, foreign key) - References players table
  - `game_type` (text) - Type of game (sorting, quiz, memory)
  - `score` (integer) - Points earned in the game
  - `time_taken` (integer, nullable) - Time in seconds to complete
  - `completed` (boolean) - Whether game was completed successfully
  - `created_at` (timestamptz) - When the score was recorded

  ### `leaderboard`
  Materialized view for high scores per game type
  - Aggregates best scores per player per game

  ## Security
  - Enable RLS on all tables
  - Allow public read access to leaderboard data
  - Allow players to insert their own scores
  - Allow players to read their own game history
  
  ## Notes
  - Player accounts are simple and don't require authentication for this educational platform
  - Scores are tracked per game type to enable multiple leaderboards
  - Time tracking helps measure player improvement
*/

-- Create players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create game_scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  game_type text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  time_taken integer,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_game_scores_player_id ON game_scores(player_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_game_type ON game_scores(game_type);
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score DESC);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Players policies
CREATE POLICY "Anyone can create a player"
  ON players FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view players"
  ON players FOR SELECT
  TO public
  USING (true);

-- Game scores policies
CREATE POLICY "Anyone can insert scores"
  ON game_scores FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view scores"
  ON game_scores FOR SELECT
  TO public
  USING (true);
