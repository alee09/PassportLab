const express = require("express");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
    let allSessions = {}
    let SessionObjects = {}
    if(req.user.role === 'admin'){
        for (let session in req.sessionStore.allsessions){
            let SessionObjects = JSON.parse(req.sessionStore.allsessions[session])
            allsessions[session] = SessionObjects.passport.user
            SessionObjects[session] = session
        }
        res.render("admin.ejs", {
        user: req.user, allsessions: allsessions, SessionObjects: SessionObjects})
    }
    else {
        res.render("dashboard.ejs")
    }

  });



  module.exports = router;
