import bcrypt from 'bcryptjs';

async function testPassword() {
  const password = process.argv[2] || 'admin123';
  const hash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$hSonjQgBZglyXyt.sXyhUeMdQzB3U7LcAruVw3L2C8hR3xumKA.Zy';

  console.log('\n=== Password Hash Test ===');
  console.log('Testing password:', password);
  console.log('Against hash:', hash);
  console.log('');

  const isMatch = await bcrypt.compare(password, hash);
  console.log('Result:', isMatch ? '✅ MATCH' : '❌ NO MATCH');

  if (!isMatch) {
    console.log('\nTrying to verify hash is valid...');
    try {
      // Test if this hash was made from 'admin123'
      const testMatch = await bcrypt.compare('admin123', hash);
      console.log('Hash was created from "admin123":', testMatch ? 'YES' : 'NO');
    } catch (e) {
      console.log('Hash validation error:', e);
    }
  }
}

testPassword().catch(console.error);
