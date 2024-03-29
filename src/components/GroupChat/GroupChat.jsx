import React, { useState, useContext } from "react";
import styles from "./GroupChat.module.css";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../Hero/Hero";
import GroupMessages from "../GroupMessages/GroupMessages";
import axios from "axios";
import backpng from "../../images/back.png";
import GroupChatInputContainer from "../GroupChatInputContainer/GroupChatInputContainer";
import { SocketContext } from "../../context/SocketProvider";

export default function GroupChat() {
  const dispatch = useDispatch();
  const {
    btnText,
    socket,
    setAddUserToTheGroupActive,
    addUserToTheGroupActive,
    setOperation,
    operation,
    setFeedback2,
    feedback2,
    setUser,
    user,
    setModalActive,
    modalActive,
  } = useContext(SocketContext);
  const [friendName, setFriendName] = useState("");

  const group = useSelector((state) => state.selectedGroup);
  const { username } = useSelector((state) => state.user);
  const { serverUrl } = useSelector((state) => state.serverUrl);

  const fetchUserToAddToTheGroup = async (e) => {
    if (e.key === "Enter" && friendName.trim()) {
      setFriendName("");
      let { data } = await axios.post(`${serverUrl}/api/add_to_group`, {
        name: friendName.trim(),
        groupId: group.groupId,
      });
      if (data.operation) {
        setUser(data.user);
      } else {
        setFeedback2(data.feedback);
      }
      setOperation(data.operation);
      setTimeout(() => {
        setFeedback2("");
      }, 2500);
    }
  };

  const addUserToTheGroup = () => {
    setAddUserToTheGroupActive(true);
    socket.emit("add_user_to_the_group", {
      chatId: user.chatId,
      username: user.username,
      groupId: group.groupId,
    });
  };

  const RemoveGroup = () => {
    dispatch({ type: "REMOVE_GROUP" });
  };

  return (
    <div>
      {!group._id ? (
        <Hero />
      ) : (
        <div className={styles.chat}>
          <div className={styles.banner}>
            <div className={styles.groupbanner}>
              <div className={styles.back} onClick={RemoveGroup}>
                <img src={backpng} alt="Back Png" className={styles.backpng} />
              </div>
              <div className={styles.profileimg}>
                {group.groupName[0].toUpperCase()}
              </div>
              <div className={styles.username}>{group.groupName}</div>
            </div>

            {group.admin === username && (
              <div className={styles.actions}>
                <div
                  className={styles.adduser}
                  onClick={() => setModalActive(!modalActive)}
                  title="Add someone to the group"
                >
                  {/* Add An Image Here */}
                </div>
              </div>
            )}
            <div className={modalActive ? styles.modalactive : styles.modal}>
              <div className={styles.modaltitle}>Add Friend</div>
              <input
                autoFocus={true}
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                className={styles.addfriend}
                placeholder="Enter a friend name"
                onKeyPress={fetchUserToAddToTheGroup}
              />
              <div className={styles.usercontainer}>
                {operation ? (
                  <div className={styles.user}>
                    <div className={styles.fetchedUsernameProfile}>
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className={styles.fetchedUsername}>
                      {user.username}
                    </div>
                    <button
                      className={styles.add}
                      onClick={addUserToTheGroup}
                      disabled={addUserToTheGroupActive}
                    >
                      {btnText}
                    </button>
                  </div>
                ) : (
                  <div className={styles.feedback}>{feedback2}</div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.messages}>
            <GroupMessages />
          </div>

          <GroupChatInputContainer />
        </div>
      )}
    </div>
  );
}
