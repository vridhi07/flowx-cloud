import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebaseConfig";

export default function ProtectRoute(Component) {
  return () => {
    const route = useRouter();
    useEffect(async() => {
      try {
        await new Promise((resolve, reject) =>
          auth.onAuthStateChanged(
            (user) => {
              if (user) {
                // User is signed in.
                // resolve(user)
              } else {
                route.push("/login");
               
              }
            },
            (error) => reject(error)
          )
        );
        return true;
      } catch (error) {
        route.push("/login");
      }
    }, []);

    return <Component {...arguments} />;
  };
}
