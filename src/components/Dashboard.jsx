import React, { useEffect, useState } from "react";
import UseAuth from "./UseAuth";
import { Container } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import Player from "./Player";
import Songs from "./Songs";
import SpotifyWebPlayer from "react-spotify-web-playback";
import axios from "axios";


// import { WebSocket } from "vite";


const webApi = new SpotifyWebApi({
    clientId: "a3dcb9dd9fb746b99ed2a17136136091"
});


export default function Dashboard({ code }) {
   
    const [search, setSearch] = useState("");
    const accessToken = UseAuth(code);
    const [result, setResult] = useState([]);
    const [playerUri, setPlayerUri] = useState();
    const [isPlay,setIsPlay] = useState(false);
    const [lyrics,setLyrics] = useState("")


    useEffect(() => {
        if (!accessToken) return;
        webApi.setAccessToken(accessToken);
    },[accessToken]);

    useEffect(() => {
        if(!accessToken) return
        const socket = new WebSocket('wss://gae2-dealer.spotify.com/?access_token='+accessToken);
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []);

    useState(()=>{
        setIsPlay(true)
    },[playerUri])

    useEffect(()=>{
        if(!playerUri) return
        axios.get("http://localhost:3000/lyrics",{
            params:{
                title:playerUri.title,
                artist:playerUri.artist
            }
        }).then(res =>{
            setLyrics(res.data.lyrics)
        }).catch(e=> console.log(e))
    },[playerUri])

    const changePlayer = (track) => {

        setPlayerUri(track);
        console.log(track.name);
        setSearch("")
    };

   

   

    useEffect(() => {
        if (!search) {
            setResult([]);
            return;
        }
        if (!accessToken) return;

        let cancel = false;
        webApi.searchTracks(search).then((res) => {
            if (cancel) return;
            setResult(
                res.body.tracks.items.map((track) => {
                    return {
                        artist: track.artists[0].name,
                        uri: track.uri,
                        name: track.name,
                        image: track.album.images[2].url
                    };
                })
            );
        }).catch((err) => console.error(err));

        return () => cancel = true;
    }, [search, accessToken]);

    

    return (
        <div className="main" style={{ height: "100vh", width: "100vw" }}>
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{
                padding: "1rem", height: "10%"
            }}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Artist / Music"
                    style={{
                        width: "90%",
                        borderRadius: "10px",
                        height: "3rem",
                        padding: "5px"
                    }}
                />
            </Container>
            <Container style={{ height: "80%", padding: "1rem" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%",
                    height: "100%",
                    margin: "auto",
                    overflowY: "auto"
                }}>
                    {result ? result.map(a => (
                        <Songs
                            style={{ width: "100%", height: "3rem" }}
                            key={a.uri}
                            a={a}
                            changePlayer={changePlayer}
                        />
                    )) : <></>}

                    {search.length === 0 && <p>{lyrics}</p>}
                </div>
            </Container>
            <Container style={{ height: "10%", padding: "1rem" }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "90%",
                    height: "100%",
                    margin: "auto"
                }}> 
                    <SpotifyWebPlayer
                        token= {UseAuth(code)}
                        showSaveIcon
                        play={isPlay}
                        uris={playerUri ? [playerUri.uri] : []}
                        callback={state =>{
                            if(!state.isPlaying) setIsPlay(false)
                        }}
                        styles={{
                            activeColor: '#1db954',
                            bgColor: '#282828',
                            color: '#fff',
                            loaderColor: '#fff',
                            sliderColor: '#1db954',
                            trackArtistColor: '#ccc',
                            trackNameColor: '#fff',
                        }}
                    />
                </div>
            </Container>
        </div>
    );
}
