module.exports = function (req, res, next) {
    if (req.cookies && req.cookies.vault_unlocked === 'true') {
        next();
    } else {
        // Carry over the intended destination to the protected page
        const redirectPath = req.originalUrl;
        res.redirect(`/protected?r=${encodeURIComponent(redirectPath)}`);
    }
};
