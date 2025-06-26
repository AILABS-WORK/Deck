const https = require('https');

const checkDeployment = () => {
  const url = 'https://AILABS-WORK.github.io/Deck';
  
  console.log('🔍 Checking deployment status...');
  console.log(`📍 URL: ${url}`);
  
  https.get(url, (res) => {
    console.log(`✅ Status: ${res.statusCode}`);
    console.log(`📊 Headers:`, res.headers);
    
    if (res.statusCode === 200) {
      console.log('🎉 Deployment is LIVE and working!');
    } else {
      console.log('❌ Deployment issue detected');
    }
  }).on('error', (err) => {
    console.log('❌ Error checking deployment:', err.message);
    console.log('💡 This might mean the site is still deploying...');
  });
};

// Check immediately
checkDeployment();

// Check again in 30 seconds
setTimeout(() => {
  console.log('\n🔄 Checking again...');
  checkDeployment();
}, 30000);