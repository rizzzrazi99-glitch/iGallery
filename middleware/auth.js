module.exports = function (req, res, next) {
    if (req.cookies && req.cookies.vault_unlocked === 'true') {
        next();
    } else {
        const dest = req.originalUrl;
        console.log(`[AUTH] Restricted access to ${dest}. Redirecting to /protected`);
        // Carry over the intended destination to the protected page
        res.redirect(`/protected?r=${encodeURIComponent(dest)}`);
    }
};
