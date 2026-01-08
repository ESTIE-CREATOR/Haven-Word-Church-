/**
 * Seed script for Haven Word Church database
 * Run with: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
  console.log('Starting seed...')

  // Seed Branch (Ibadan)
  console.log('Seeding branches...')
  const { data: branch, error: branchError } = await supabase
    .from('branches')
    .upsert({
      name: 'Haven Word Church Ibadan',
      slug: 'ibadan',
      country: 'Nigeria',
      city: 'Ibadan',
      category: 'Main Campus',
      address: 'Opposite Gate 5, Behind Adamasingba Stadium, Ibadan, Oyo State, Nigeria',
      lat: 7.3964,
      lng: 3.9167,
      service_times: {
        Sunday: '7:30am (First Service), 10:00am (Second Service)',
        Wednesday: '5:30pm (Bible Study)',
      },
      contact_phone: '+234-8169934313',
      pastor_name: 'Pastor Anthonia Amadi',
      description: 'Our main campus in Ibadan, Oyo State, Nigeria.',
    })
    .select()
    .single()

  if (branchError) {
    console.error('Error seeding branch:', branchError)
  } else {
    console.log('✓ Branch seeded')
  }

  // Seed Videos (YouTube-based)
  console.log('Seeding videos...')
  const videos = [
    {
      title: 'The Power of Faith',
      preacher: 'Pastor Anthonia Amadi',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtube_video_id: 'dQw4w9WgXcQ',
      thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      preached_at: '2024-01-07',
      featured: true,
    },
    {
      title: 'Walking in Purpose',
      preacher: 'Pastor Anthonia Amadi',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtube_video_id: 'dQw4w9WgXcQ',
      thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      preached_at: '2024-01-14',
      featured: true,
    },
    // Add more videos...
  ]

  for (const video of videos) {
    const { error } = await supabase.from('videos').upsert(video)
    if (error) {
      console.error('Error seeding video:', error)
    }
  }
  console.log(`✓ ${videos.length} videos seeded`)

  // Seed Audio Messages
  console.log('Seeding audio messages...')
  const audioMessages = [
    {
      slug: 'faith-and-belief',
      title: 'Faith and Belief',
      speaker: 'Pastor Anthonia Amadi',
      date: '2024-01-07',
      audio_url: 'https://example.com/audio1.mp3',
      featured: true,
    },
    // Add more audio messages...
  ]

  for (const audio of audioMessages) {
    const { error } = await supabase.from('audio').upsert(audio)
    if (error) {
      console.error('Error seeding audio:', error)
    }
  }
  console.log(`✓ ${audioMessages.length} audio messages seeded`)

  // Seed Events
  console.log('Seeding events...')
  const events = [
    {
      title: 'Sunday Service',
      slug: 'sunday-service-jan-21',
      start_date_time: '2024-01-21T07:30:00Z',
      end_date_time: '2024-01-21T09:30:00Z',
      location_name: 'Haven Word Church Ibadan',
      address: 'Opposite Gate 5, Behind Adamasingba Stadium',
      description: 'Join us for our Sunday worship service.',
    },
    // Add more events...
  ]

  for (const event of events) {
    const { error } = await supabase.from('events').upsert(event)
    if (error) {
      console.error('Error seeding event:', error)
    }
  }
  console.log(`✓ ${events.length} events seeded`)

  // Seed Testimonies
  console.log('Seeding testimonies...')
  const testimonies = [
    {
      name: 'John Doe',
      title: 'Transformed Life',
      body: 'God has transformed my life through this ministry. I am forever grateful.',
      status: 'approved',
    },
    // Add more testimonies...
  ]

  for (const testimony of testimonies) {
    const { error } = await supabase.from('testimonies').upsert(testimony)
    if (error) {
      console.error('Error seeding testimony:', error)
    }
  }
  console.log(`✓ ${testimonies.length} testimonies seeded`)

  // Seed Departments
  console.log('Seeding departments...')
  const departments = [
    {
      name: 'Worship',
      slug: 'worship',
      short_description: 'Leading the church in worship',
      contact_email: 'worship@havenwordchurch.org',
    },
    // Add more departments...
  ]

  for (const dept of departments) {
    const { error } = await supabase.from('departments').upsert(dept)
    if (error) {
      console.error('Error seeding department:', error)
    }
  }
  console.log(`✓ ${departments.length} departments seeded`)

  console.log('Seed completed!')
}

seed().catch(console.error)


