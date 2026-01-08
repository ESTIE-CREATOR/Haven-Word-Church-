/**
 * Create Admin User Script
 * 
 * Usage: node scripts/create-admin.js <email> <password>
 * 
 * Example: node scripts/create-admin.js admin@havenwordchurch.org MySecurePassword123!
 * 
 * Make sure SUPABASE_SERVICE_ROLE_KEY is set in your .env.local file
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('❌ Usage: node scripts/create-admin.js <email> <password>')
  console.error('Example: node scripts/create-admin.js admin@example.com MyPassword123!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  try {
    console.log('🔄 Creating user...')
    
    // Create user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm email
    })

    if (authError) {
      console.error('❌ Error creating user:', authError.message)
      process.exit(1)
    }

    const userId = authData.user.id
    console.log('✅ User created:', email)
    console.log('   User ID:', userId)

    // Assign admin role
    console.log('🔄 Assigning admin role...')
    
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: userId,
        role: 'admin'
      })

    if (roleError) {
      console.error('❌ Error assigning role:', roleError.message)
      console.error('   User was created but role assignment failed.')
      console.error('   Run this SQL manually:')
      console.error(`   INSERT INTO user_roles (user_id, role) VALUES ('${userId}', 'admin');`)
      process.exit(1)
    }

    console.log('✅ Admin role assigned successfully!')
    console.log('')
    console.log('🎉 Admin user created successfully!')
    console.log('   Email:', email)
    console.log('   User ID:', userId)
    console.log('   Role: admin')
    console.log('')
    console.log('You can now login at: http://localhost:3000/admin/login')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    process.exit(1)
  }
}

createAdminUser()

