const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure .env.local exists with correct DATABASE_URL
try {
  if (!fs.existsSync('.env.local')) {
    console.log('Creating .env.local file with DATABASE_URL...');
    fs.writeFileSync('.env.local', 'DATABASE_URL="file:./prisma/dev.db"\n');
  } else {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    if (!envContent.includes('DATABASE_URL')) {
      console.log('Adding DATABASE_URL to .env.local...');
      fs.appendFileSync('.env.local', '\nDATABASE_URL="file:./prisma/dev.db"\n');
    }
  }
  console.log('.env.local file configured correctly.');
} catch (error) {
  console.error('Error setting up .env.local:', error.message);
  process.exit(1);
}

// Run Prisma migrations
try {
  console.log('Running Prisma database migrations...');
  execSync('npx prisma migrate dev --name init_auction_tables', { stdio: 'inherit' });
  console.log('Database migrations completed successfully.');
} catch (error) {
  console.error('Error running migrations:', error.message);
}

// Generate Prisma client
try {
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully.');
} catch (error) {
  console.error('Error generating Prisma client:', error.message);
}

console.log('Database setup completed!'); 