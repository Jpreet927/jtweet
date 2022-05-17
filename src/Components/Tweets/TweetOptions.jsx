import React from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useUserAuth } from "../../Context/UserAuthContext";
import "../../Styles/TweetOptions/TweetOptions.css";

function TweetOptions(props) {
    const { handleDelete, author } = props;
    const { user } = useUserAuth();

    return (
        <div className="tweetoptions__container">
            <div className="tweetoptions__item">
                <OpenInNewOutlinedIcon className="tweetoptions__icon" />
                <button>View Tweet</button>
            </div>
            <div className="tweetoptions__item">
                <VisibilityOffOutlinedIcon className="tweetoptions__icon" />
                <button>Hide Tweet</button>
            </div>
            {/* <button>Report Tweet</button> */}
            {user.uid == author && (
                <div
                    className="tweetoptions__item"
                    id="tweetoptions__delete"
                    onClick={handleDelete}
                >
                    <DeleteOutlineOutlinedIcon className="tweetoptions__icon" />
                    <button>Delete Tweet</button>
                </div>
            )}
        </div>
    );
}

export default TweetOptions;
