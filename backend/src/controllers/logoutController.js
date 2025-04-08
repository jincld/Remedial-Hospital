const logoutController = {};

logoutController.logout = async (req, res) => {
    //Borrar cookie de authToker
    res.clearCookie("authToken")

    return res.json({message: "Sesión cerrada"})
}

export default logoutController;