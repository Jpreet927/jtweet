import React, { useState, useEffect, useRef } from "react";
import {
    doc,
    collection,
    addDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    arrayUnion,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import { db, storage } from "../../Firebase/firebase";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../Misc/Avatar";
import "../../Styles/ReplyBox/ReplyBox.css";
import "react-toastify/dist/ReactToastify.css";

function ReplyBox(props) {
    const { setReplyBoxOpen, replyingTo } = props;
    const { user } = useUserAuth();
    const { theme } = useThemeContext();
    const [currentReply, setCurrentReply] = useState("");
    const [currentReplyImage, setCurrentReplyImage] = useState(null);
    const imagePickerRef = useRef(null);

    const handleReply = async (e) => {
        e.preventDefault();
        const reply = {
            message: currentReply,
            image: currentReplyImage,
            likes: [],
            dislikes: [],
            replies: [],
            timestamp: serverTimestamp(),
            author: user.uid,
            replyto: replyingTo.id,
            uid: "",
        };

        if (currentReply !== "") {
            try {
                // adds tweet to collection with all tweet
                const replyGeneralRef = collection(db, "replies");
                const replyRef = await addDoc(replyGeneralRef, reply);
                await updateDoc(doc(db, "replies", replyRef.id), {
                    uid: replyRef.id,
                });
                const replyImageRef = ref(
                    storage,
                    `replies/${replyRef.id}/image`
                );

                if (currentReplyImage) {
                    await uploadString(
                        replyImageRef,
                        currentReplyImage,
                        "data_url"
                    ).then(async (snapshot) => {
                        const replyImageURL = await getDownloadURL(
                            replyImageRef
                        );
                        await updateDoc(doc(db, "replies", replyRef.id), {
                            image: replyImageURL,
                        });
                    });
                }

                await updateDoc(doc(db, "all-tweets", replyingTo.id), {
                    replies: arrayUnion(replyRef.id),
                });

                await updateDoc(
                    doc(
                        db,
                        "tweets",
                        replyingTo.author,
                        "tweets",
                        replyingTo.id
                    ),
                    {
                        replies: arrayUnion(replyRef.id),
                    }
                );

                setCurrentReply("");
                setCurrentReplyImage(null);
                setReplyBoxOpen(false);
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
            setCurrentReplyImage(readerEvent.target.result);
        };
    };

    const handleReplyBoxCancel = (e) => {
        e.preventDefault();
        setReplyBoxOpen(false);
    };

    return (
        <div
            className={`${theme} replybox__container`}
            onClick={(e) => e.stopPropagation()}
        >
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
            <div className="replybox__input-container">
                <Avatar dimension={`45px`} />
                <textarea
                    name=""
                    id=""
                    rows="2"
                    value={currentReply}
                    onChange={(e) => setCurrentReply(e.target.value)}
                    placeholder="Tweet your reply."
                />
            </div>
            {currentReplyImage !== null && (
                <div className="replybox__image-preview-container">
                    <div
                        className="replybox__image-preview-close"
                        onClick={() => setCurrentReplyImage(null)}
                    >
                        <CloseIcon className="replybox__image-close" />
                    </div>
                    <img src={currentReplyImage} alt="" />
                </div>
            )}
            <div className="replybox__buttons">
                <div className="replybox__buttons-icons">
                    <div
                        className="replybox__buttons-container"
                        onClick={() => imagePickerRef.current.click()}
                    >
                        <AddPhotoAlternateOutlinedIcon className="replybox__icon" />
                        <input
                            type="file"
                            hidden
                            placeholder="Tweet your reply"
                            onChange={(e) => {
                                handleImage(e);
                            }}
                            ref={imagePickerRef}
                        />
                    </div>
                    <div className="replybox__buttons-container">
                        <EmojiEmotionsOutlinedIcon className="replybox__icon" />
                    </div>
                </div>
                <div className="replybox__buttons-reply">
                    <button
                        id="replybox__cancel"
                        onClick={(e) => handleReplyBoxCancel(e)}
                    >
                        Cancel
                    </button>
                    <button onClick={(e) => handleReply(e)}>Reply</button>
                </div>
            </div>
        </div>
    );
}

export default ReplyBox;
