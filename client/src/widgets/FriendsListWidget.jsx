import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/user";


const FriendsListWidget = ({ }) => {
    const { _id } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/friends/${_id}`)
            .then((res) => {
                console.log(res.data);
                dispatch(setFriends({ friends: res.data }))
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>FriendsListWidget</div>
    )
}

export default FriendsListWidget