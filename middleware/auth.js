module.exports = function (req, res, next) {
    if (req.cookies.vault_unlocked === 'true') {
        next();
    } else {
        res.redirect('/protected');
    }
};
