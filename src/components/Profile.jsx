import { PiUserListLight } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurentUser } from "../redux/features/auth";
import { updateUserInformation } from "../redux/features/users";
import PasswordModal from "../sections/PasswordModal";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurentUser()).unwrap().then(res => {
            //console.log("res", res.user);
            setCurrentUser(res.user);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const handlePasswordChange = (oldPassword, newPassword) => {
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
        const data = {
            password: newPassword
        }
        dispatch(updateUserInformation({ id: currentUser?.id, data })).unwrap().then((res) => {
            if (res.status == 200) {
                //setModalOpen(false);
            }
        })
    }

    console.log("currentUser", currentUser);
    return (
        <>
            <div className="profile-banner">
                <div className="banner-content">

                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex">
                    <div className="profile-picture mt-[-50px] bg-white flex flex-col">
                        {/* <img src="#" alt="" /> */}
                        <PiUserListLight className="mt-[28px] ml-[5px] h-[42px] w-[42px]" />
                    </div>
                    <div className="flex justify-end w-[90%] mr-4">
                        <button className="w-[150px] border border-black rounded-full mt-2 font-extralight shadow-md hover:bg-gray-200"
                            onClick={() => { setModalOpen(true) }}
                            disabled={currentUser?.role?.roleName === 'admin'}
                            >
                            Change password
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="font-bold">
                        {currentUser?.lastname}
                    </span>
                    <span className="color-gray">
                        {'@'}{currentUser?.staffid}
                    </span>
                </div>
            </div>
            <PasswordModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handlePasswordChange} />
        </>
    )
}
export default Profile;