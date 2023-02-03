const Authenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        res.redirect(`/profile/${req.user._id}`);
    }else{
        next()
    }

    
}
const IsAdmin = (req, res, next) => {
    console.log("Entre")
    const bool = req.user.isAdmin;
    bool ? next() : res.redirect("/");
}
export { Authenticated, IsAdmin }