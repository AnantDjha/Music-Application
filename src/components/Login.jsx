import React from "react";
import { Container } from 'react-bootstrap'


const USER_AUTH = "https://accounts.spotify.com/authorize?client_id=a3dcb9dd9fb746b99ed2a17136136091&response_type=code&redirect_uri=http://localhost:5173&scope= streaming%20playlist-read-private%20playlist-modify-private%20user-read-playback-state%20user-modify-playback-state%20user-read-email%20user-library-modify%20user-library-read"
function Login()
{
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh",width:"100vw"}}>
            <a href={USER_AUTH} className="btn bg-success btn-lg" >Login With Application</a>
        </Container>
    )
}

export default Login;
