// Debug authentication status - run this in browser console
console.log('🔍 Authentication Debug:');
console.log('accessToken:', localStorage.getItem('accessToken'));
console.log('refreshToken:', localStorage.getItem('refreshToken'));
console.log('user:', localStorage.getItem('user'));
console.log('isAdmin:', localStorage.getItem('isAdmin'));
console.log('loginTime:', localStorage.getItem('loginTime'));

// Check if token is expired
const loginTime = localStorage.getItem('loginTime');
if (loginTime) {
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
    console.log('Hours since login:', hoursDiff);
    console.log('Token likely expired:', hoursDiff > 24);
}
