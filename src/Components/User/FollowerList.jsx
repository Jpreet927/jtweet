import React from "react";
import { useUserAuth } from "../../Context/UserAuthContext";

function FollowerList() {
    const { userDoc } = useUserAuth();

    return <div>FollowerList</div>;
}

export default FollowerList;
