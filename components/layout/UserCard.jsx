"use client";

import { useUser } from "@clerk/nextjs";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserCard = ({ userData, update }) => {
    const { user, isLoaded } = useUser();

    const [loading, setLoading] = useState(true);

    const [userInfo, setUserInfo] = useState({});

    const getUser = async () => {
        const response = await fetch(`/api/user/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user]);

    const isFollowing = userInfo?.following?.find(
        (item) => item._id === userData._id
    );

    const handleFollow = async () => {
        const response = await fetch(
            `/api/user/${user.id}/follow/${userData._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        setUserInfo(data);
        update();
    };
    console.log("hihi",userData)

    return (
        <div className="flex justify-between items-center">
            <Link className="flex gap-4 items-center" href={`/users/${userData.username}`}>
                <Image
                    src={userData.profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-black-2 text-body-bold">
                        {userData.firstName} {userData.lastName}
                    </p>
                    <p className="text-small text-light-3">
                        @{userData.username}
                    </p>
                </div>
            </Link>


        </div>
    );
};

export default UserCard;
