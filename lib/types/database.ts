export type UserRole = 'admin' | 'media' | 'finance'

export interface UserRoleRow {
  id: string
  user_id: string
  role: UserRole
  created_at: string
}

export interface Video {
  id: string
  title: string
  preacher: string
  youtube_url: string
  youtube_video_id: string
  thumbnail_url: string
  preached_at: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Audio {
  id: string
  slug: string
  title: string
  speaker: string
  date: string
  audio_url: string | null
  thumbnail_url: string | null
  duration_seconds: number | null
  listen_count: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  slug: string
  start_date_time: string
  end_date_time: string | null
  location_name: string | null
  address: string | null
  description: string | null
  google_cal_url: string | null
  created_at: string
  updated_at: string
}

export interface Testimony {
  id: string
  name: string
  title: string | null
  body: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface Branch {
  id: string
  name: string
  slug: string
  country: string
  city: string
  category: string
  address: string
  postcode: string | null
  lat: number | null
  lng: number | null
  service_times: Record<string, any> | null
  contact_email: string | null
  contact_phone: string | null
  pastor_name: string | null
  description: string | null
  gallery_images: string[] | null
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  name: string
  slug: string
  short_description: string | null
  long_description: string | null
  contact_email: string | null
  created_at: string
  updated_at: string
}

export interface GivingRecord {
  id: string
  amount: number
  donor_name: string | null
  email: string | null
  phone: string | null
  payment_method: string | null
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface UploadAsset {
  id: string
  type: 'audio' | 'video' | 'image' | 'doc'
  filename: string
  mime_type: string
  size_bytes: number
  storage_url: string
  created_at: string
}


