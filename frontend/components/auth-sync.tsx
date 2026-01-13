"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export const AuthSync = () => {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const isSynced = useRef(false);

    useEffect(() => {
        if (isLoaded && user && !isSynced.current) {
            const syncUser = async () => {
                isSynced.current = true; // Prevent double sync in React strict mode
                try {
                    const token = await getToken();
                    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/users/sync`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            clerkId: user.id,
                            email: user.primaryEmailAddress?.emailAddress,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl
                        })
                    });
                } catch (error) {
                    console.error("Failed to sync user", error);
                    isSynced.current = false; // Retry on next mount/update if failed? Usually better to just log.
                }
            };

            syncUser();
        }
    }, [isLoaded, user, getToken]);

    return null;
};
