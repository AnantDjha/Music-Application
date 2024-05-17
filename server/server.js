const express = require("express")
const SpotifyApi = require("spotify-web-api-node")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")



const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post("/refresh",(req,res)=>{
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyApi({
        redirectUri:"http://localhost:5173",
        clientId:"a3dcb9dd9fb746b99ed2a17136136091",
        clientSecret:"afca72da986c456694f0883a9901a7e3",
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data)=>{
            res.json({
                accessToken:data.body.accessToken,
                expireIn:data.body.expireIn
            })
        }
    ).catch(()=>{
        res.sendStatus(400);
    })
})

app.post("/login",(req,res)=>{
    const code = req.body.code
    const spotifyApi = new SpotifyApi({
        redirectUri:"http://localhost:5173",
        clientId:"a3dcb9dd9fb746b99ed2a17136136091",
        clientSecret:"afca72da986c456694f0883a9901a7e3"
    })

    spotifyApi.authorizationCodeGrant(code).then((data)=>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken : data.body.refresh_token,
            expireIn : data.body.expires_in
        })
    }).catch((e)=>{
        console.log(e)
        res.send(400)
    })
})

app.get("/lyrics", (req, res) => {
    lyricsFinder("poets of fall", "carnival of rust")
        .then(lyrics => {
            lyrics = lyrics || "No Lyrics";
            console.log(lyrics);
            res.json({ lyrics });
        });
});
app.listen(3000,async ()=>{
    let l = await lyricsFinder("poets of fall", "carnival of rust") || "No Lyrics"
    await console.log(l)
})

