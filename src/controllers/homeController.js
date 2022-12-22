
let getHomePage = (req, res) => {
    // return res.send("Hello from homeController");
    return res.render('homepage.ejs')
}

module.exports = {
    getHomePage: getHomePage,
}