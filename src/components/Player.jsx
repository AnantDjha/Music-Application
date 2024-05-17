import React from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";


export default function Player({accessToken,trackUri})
{
    if(!accessToken) return null;
    return (
        <SpotifyWebPlayer

            token={accessToken}
            showSaveIcon
            uris={trackUri? [trackUri] : []}

        
        />
    )
}