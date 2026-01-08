-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles Table (RBAC)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'media', 'finance')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Videos Table (YouTube-based)
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  preacher TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  youtube_video_id TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  preached_at DATE NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audio Messages Table
CREATE TABLE IF NOT EXISTS audio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  audio_url TEXT,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  listen_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  start_date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date_time TIMESTAMP WITH TIME ZONE,
  location_name TEXT,
  address TEXT,
  description TEXT,
  google_cal_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonies Table
CREATE TABLE IF NOT EXISTS testimonies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Branches Table
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  address TEXT NOT NULL,
  postcode TEXT,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  service_times JSONB,
  contact_email TEXT,
  contact_phone TEXT,
  pastor_name TEXT,
  description TEXT,
  gallery_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments Table (internal only, not shown on public site)
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  long_description TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Giving Records Table
CREATE TABLE IF NOT EXISTS giving_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount DECIMAL(10, 2) NOT NULL,
  donor_name TEXT,
  email TEXT,
  phone TEXT,
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Upload Assets Table
CREATE TABLE IF NOT EXISTS upload_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('audio', 'video', 'image', 'doc')),
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  storage_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_featured ON videos(featured);
CREATE INDEX IF NOT EXISTS idx_videos_preached_at ON videos(preached_at DESC);
CREATE INDEX IF NOT EXISTS idx_audio_featured ON audio(featured);
CREATE INDEX IF NOT EXISTS idx_audio_date ON audio(date DESC);
CREATE INDEX IF NOT EXISTS idx_events_start_date_time ON events(start_date_time);
CREATE INDEX IF NOT EXISTS idx_testimonies_status ON testimonies(status);
CREATE INDEX IF NOT EXISTS idx_branches_slug ON branches(slug);


