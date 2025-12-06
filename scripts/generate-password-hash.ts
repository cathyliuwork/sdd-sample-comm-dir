import bcrypt from 'bcrypt';

async function generatePasswordHash() {
  const password = process.argv[2] || 'ChangeMe123!';
  const saltRounds = 10;

  console.log('\nGenerating bcrypt hash for password...\n');

  const hash = await bcrypt.hash(password, saltRounds);

  console.log('='.repeat(60));
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('='.repeat(60));
  console.log('\nCopy this line to your .env.local file:');
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('');
}

generatePasswordHash().catch(console.error);
