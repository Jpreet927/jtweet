import React, { useState, useRef } from "react";
import {
    doc,
    collection,
    addDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db, storage } from "../../Firebase/firebase";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../Misc/Avatar";
import "../../Styles/TweetBox/TweetBox.css";
import "react-toastify/dist/ReactToastify.css";

function TweetBox() {
    const { user } = useUserAuth();
    const [currentTweet, setCurrentTweet] = useState("");
    const [currentTweetImage, setCurrentTweetImage] = useState(null);
    const imagePickerRef = useRef(null);

    const handleTweet = async () => {
        const tweet = {
            message: currentTweet,
            image: currentTweetImage,
            likes: [],
            dislikes: [],
            replies: [],
            timestamp: serverTimestamp(),
            author: user.uid,
        };

        if (currentTweet !== "") {
            try {
                // adds tweet to collection with all tweet
                const tweetGeneralRef = collection(db, "all-tweets");
                const tweetRef = await addDoc(tweetGeneralRef, tweet);

                // adds tweet to sub-collection containing individual users tweets
                const tweetUserRef = doc(
                    db,
                    "tweets",
                    user.uid,
                    "tweets",
                    tweetRef.id
                );
                await setDoc(tweetUserRef, tweet);

                // uploads image to storage, updates tweet docs image path with storage reference
                const tweetImageRef = ref(
                    storage,
                    `tweets/${tweetRef.id}/image`
                );

                if (currentTweetImage) {
                    await uploadString(
                        tweetImageRef,
                        currentTweetImage,
                        "data_url"
                    ).then(async (snapshot) => {
                        const tweetImageURL = await getDownloadURL(
                            tweetImageRef
                        );
                        await updateDoc(doc(db, "all-tweets", tweetRef.id), {
                            image: tweetImageURL,
                        });
                        await updateDoc(
                            doc(db, "tweets", user.uid, "tweets", tweetRef.id),
                            {
                                image: tweetImageURL,
                            }
                        );
                    });
                }

                setCurrentTweet("");
                setCurrentTweetImage(null);
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("Please enter your tweet in the input field!", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setCurrentTweetImage(readerEvent.target.result);
        };
    };

    return (
        <div className="tweetbox__container">
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="tweetbox__input-container">
                <Avatar dimension={`70px`} />
                <textarea
                    name=""
                    id=""
                    rows="2"
                    value={currentTweet}
                    onChange={(e) => setCurrentTweet(e.target.value)}
                    placeholder="What's happening?"
                />
            </div>
            {currentTweetImage !== null && (
                <div className="tweetbox__image-preview-container">
                    <div
                        className="tweetbox__image-preview-close"
                        onClick={() => setCurrentTweetImage(null)}
                    >
                        <CloseIcon className="tweetbox__image-close" />
                    </div>
                    <img src={currentTweetImage} alt="" />
                </div>
            )}
            <div className="tweetbox__buttons">
                <div className="tweetbox__buttons-icons">
                    <div
                        className="tweetbox__buttons-container"
                        onClick={() => imagePickerRef.current.click()}
                    >
                        <AddPhotoAlternateOutlinedIcon className="tweetbox__icon" />
                        <input
                            type="file"
                            hidden
                            placeholder="What's happening?"
                            onChange={(e) => {
                                handleImage(e);
                            }}
                            ref={imagePickerRef}
                        />
                    </div>
                    <div className="tweetbox__buttons-container">
                        <EmojiEmotionsOutlinedIcon className="tweetbox__icon" />
                    </div>
                </div>
                <button onClick={handleTweet}>Tweet</button>
            </div>
        </div>
    );
}

export default TweetBox;
