import { useEffect, useState } from "react"

export const useAuth = (code: string) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
         
    }, [code]);
}