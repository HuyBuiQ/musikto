"use client";

import { useUser } from "@clerk/nextjs";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserCard = ({ userData, update }) => {
    return (
        <div className="flex justify-between items-center">
            <Link className="flex gap-4 items-center" href={`/users/${userData.username}/posts`}>
                <Image
                    src={userData.profilePhoto}
                    alt="profile photo"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-black-2 font-semibold">
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
