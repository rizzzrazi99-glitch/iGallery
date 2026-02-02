const fs = require('fs');
const path = require('path');

const dirs = [
    './public/user-images/',
    './public/gallery-images/',
    './public/images/',
    './public/',
    './tmp/',
    './.data/'
];

console.log('--- Writability Test ---');
dirs.forEach(dir => {
    try {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const testFile = path.join(dir, 'test-write-' + Date.now() + '.txt');
        fs.writeFileSync(testFile, 'test');
        console.log(`PASS: ${dir}`);
        fs.unlinkSync(testFile);
    } catch (err) {
        console.log(`FAIL: ${dir} - ${err.message}`);
    }
});
console.log('--- End Test ---');
