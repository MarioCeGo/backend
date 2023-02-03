const Authenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        res.redirect(`/profile`);
    }else{
        next();
    }

    
}
const IsAdmin = (req, res, next) => {
    const bool = req.user.isAdmin;
    bool ? next() : res.redirect("/");
}
export { Authenticated, IsAdmin };