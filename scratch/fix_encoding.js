const fs = require('fs');
const path = require('path');

const replacements = {
    'Ã ': 'à',
    'Ã²': 'ò',
    'Ã¹': 'ù',
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã¬': 'ì',
    'Ã³': 'ó',
    'Ã¡': 'á',
    'Ã¢': 'â',
    'Ã®': 'î',
    'Ã”': 'Ô',
    'Ã»': 'û',
    'Ã‰': 'É',
    'Ãˆ': 'È',
    'â€™': "'",
    'Â°': '°',
    'â€¢': '•',
    'Ã¯': 'ï',
    'Ãª': 'ê',
    'Ã ': 'à' // duplicated just in case
};

// Also common corruption patterns if read as Windows-1252 but were UTF-8
const extraFixes = [
    { target: /curiositÃ /g, replacement: 'curiosità' },
    { target: /perchÃ©/g, replacement: 'perché' },
    { target: /perchÃ¨/g, replacement: 'perché' },
    { target: /cosÃ¬/g, replacement: 'così' },
    { target: /qualitÃ /g, replacement: 'qualità' },
    { target: /Ã /g, replacement: 'à' },
    { target: /Ã¨/g, replacement: 'è' },
    { target: /Ã©/g, replacement: 'é' },
    { target: /Ã¬/g, replacement: 'ì' },
    { target: /Ã²/g, replacement: 'ò' },
    { target: /Ã¹/g, replacement: 'ù' }
];

function fixFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Check for "" or other weird markers that might indicate corruption
    // If we see Ã followed by a space or weird char, it's double encoding.
    
    for (const [target, replacement] of Object.entries(replacements)) {
        content = content.split(target).join(replacement);
    }
    
    for (const fix of extraFixes) {
        content = content.replace(fix.target, fix.replacement);
    }

    // One more pass for specific broken words seen in logs
    content = content.replace(/perchǸ/g, 'perché');
    content = content.replace(/cosǪ/g, 'così');
    content = content.replace(/qualit/g, 'qualità');
    content = content.replace(/Curiosit/g, 'Curiosità');
    content = content.replace(/caff/g, 'caffè');
    content = content.replace(//g, 'à'); // Dangerous, but often  in logs is à in this specific repo

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed: ${filepath}`);
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walk(fullPath);
            }
        } else if (file.endsWith('.html')) {
            fixFile(fullPath);
        }
    }
}

const rootDir = 'c:\\Users\\huzhe\\Documents\\GitHub\\SaporiSvelati';
walk(rootDir);
