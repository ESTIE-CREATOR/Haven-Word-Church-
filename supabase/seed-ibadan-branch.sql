-- Quick seed: Insert Ibadan branch
-- Run this in Supabase SQL Editor after running schema.sql and rls-policies.sql

INSERT INTO branches (
  name,
  slug,
  country,
  city,
  category,
  address,
  lat,
  lng,
  service_times,
  contact_phone,
  pastor_name,
  description
) VALUES (
  'Haven Word Church Ibadan',
  'ibadan',
  'Nigeria',
  'Ibadan',
  'Main Campus',
  'Opposite Gate 5, Behind Adamasingba Stadium, Ibadan, Oyo State, Nigeria',
  7.3964,
  3.9167,
  '{"Sunday": "7:30am (First Service), 10:00am (Second Service)", "Wednesday": "5:30pm (Bible Study)"}'::jsonb,
  '+234-8169934313',
  'Pastor Anthonia Amadi',
  'Our main campus in Ibadan, Oyo State, Nigeria.'
) ON CONFLICT (slug) DO NOTHING;

