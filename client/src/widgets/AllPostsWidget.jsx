import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./PostWidget";
import axios from "axios";
import { setPosts } from "state/user";

const AllPostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);

    const getAllPosts = () => {
        axios
            .get(`http://localhost:8080/api/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                dispatch(setPosts({ posts: res.data }));
                // console.log('refreshed all posts');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getUserPosts = () => {
        axios
            .get(`http://localhost:8080/api/posts/${userId}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                dispatch(setPosts({ posts: res.data }));
                // console.log('refreshed user posts');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getAllPosts();
        }
    }, [userId, isProfile]);
    // }, [postAdded, userId]);

    return (
        <>
            {posts?.map(
                ({
                    _id,
                    title,
                    likes,
                    viewCount,
                    comments,
                    photo,
                    userId,
                    createdAt,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId._id}
                        title={title}
                        photo={photo}
                        comments={comments}
                        createdAt={createdAt}
                        viewCount={viewCount}
                        likes={likes}
                        postUserPicture={userId.userPhoto}
                        postUserFullName={
                            userId.firstName + " " + userId.lastName
                        }
                        postUserLocation={userId.location}
                        userName={userId.userName}
                    />
                )
            )}
        </>
    );
};

export default AllPostsWidget;
