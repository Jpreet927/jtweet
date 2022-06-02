import React, { useEffect, useState, useRef } from "react";
import {
    doc,
    collection,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
} from "firebase/firestore";
import {
    ref,
    uploadStirng,
    deleteObject,
    getDownloadURL,
    uploadString,
} from "firebase/storage";
import { db, storage } from "../../Firebase/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import Avatar from "../Misc/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import "../../Styles/UpdateProfileModal/UpdateProfileModal.css";

function UpdateProfileModal(props) {
    const { handleUpdateInvisible, setUpdateModalOpen } = props;
    const { user, userDoc } = useUserAuth();
    const { theme } = useThemeContext();
    const [banner, setBanner] = useState(userDoc?.banner);
    const [avatar, setAvatar] = useState(userDoc?.avatar);
    const [name, setName] = useState(userDoc?.name);
    const [username, setUsername] = useState(userDoc?.username);
    const [bio, setBio] = useState(userDoc?.bio);
    const [error, setError] = useState("");
    const avatarPickerRef = useRef(null);
    const bannerPickerRef = useRef(null);

    const handleCloseUpdateProfileModal = () => {
        // handleUpdateInvisible();
        setUpdateModalOpen(false);
    };

    const handleUpdateProfile = async () => {
        // write updates to firebase
        const userProfileRef = doc(db, "users", user.uid);
        const userAvatarRef = ref(storage, `profiles/${user.uid}/avatar`);
        const userBannerRef = ref(storage, `profiles/${user.uid}/banner`);

        // check if username is available -> query for username, if doc exists then dont allow update
        const usernameQuery = query(
            collection(db, "users"),
            where("username", "==", username)
        );

        try {
            await updateDoc(userProfileRef, {
                name: name,
                username: username,
                bio: bio,
            });
        } catch (err) {
            console.log(err.message);
        }

        if (banner) {
            try {
                await uploadString(userBannerRef, banner, "data_url").then(
                    async (snapshot) => {
                        const userBannerURL = await getDownloadURL(
                            userBannerRef
                        );
                        await updateDoc(userProfileRef, {
                            banner: userBannerURL,
                        });
                    }
                );
            } catch (err) {
                setError(err.message);
            }
        }

        if (avatar) {
            try {
                await uploadString(userAvatarRef, avatar, "data_url").then(
                    async (snapshot) => {
                        const userAvatarURL = await getDownloadURL(
                            userAvatarRef
                        );
                        await updateDoc(userProfileRef, {
                            avatar: userAvatarURL,
                        });
                    }
                );
            } catch (err) {}
        }
    };

    const handleAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setAvatar(readerEvent.target.result);
        };
    };

    const handleBanner = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setBanner(readerEvent.target.result);
        };
    };

    return (
        <div className={`${theme} update__container`}>
            <div className="update__heading">
                <h3>Profile Settings</h3>
                <CloseIcon
                    className="update__close-icon"
                    onClick={() => setUpdateModalOpen(false)}
                />
            </div>
            <div className="update__banner">
                <div
                    className="update__banner-icon"
                    onClick={() => bannerPickerRef.current.click()}
                >
                    <AddAPhotoIcon className="update__icon" />
                </div>
                <input
                    type="file"
                    ref={bannerPickerRef}
                    onChange={(e) => handleBanner(e)}
                    hidden
                />
                <img src={banner} alt="" />
            </div>
            <div className="update__pfp-name">
                <div className="update__pfp">
                    <div
                        className="update__pfp-icon"
                        onClick={() => avatarPickerRef.current.click()}
                    >
                        <AddAPhotoIcon className="update__icon" />
                    </div>
                    <input
                        type="file"
                        ref={avatarPickerRef}
                        onChange={(e) => handleAvatar(e)}
                        hidden
                    />
                    <div className="update__pfp-image">
                        <img src={avatar} alt="" />
                    </div>
                </div>
                {/* <Avatar dimension={"150px"} /> */}
                <div className="update__name">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="update__bio">
                <label htmlFor="">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    id=""
                    rows="10"
                ></textarea>
            </div>
            <div className="update__button">
                <button id="update__cancel">Cancel</button>
                <button id="update__save" onClick={handleUpdateProfile}>
                    Save Settings
                </button>
            </div>
        </div>
    );
}

export default UpdateProfileModal;
