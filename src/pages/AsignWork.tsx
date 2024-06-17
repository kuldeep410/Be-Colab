import { User } from 'firebase/auth';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AssignWorkForUser from '../components/Features/AsignWork/AssignWorkForUser';
import SideBar from '../components/Home/SideBar';
import { db } from '../shared/firebase';


type Props = {
    currentUser: any;
}

export default function AssignWork(props: Props) {
    const location = useLocation();
    const [userRole, setUserRole] = React.useState<boolean>();
    const user = props.currentUser;
    const IdColletion = location.state;
    const uid = IdColletion.uid;
    const conversationId = IdColletion.conversationId;

    const hanleUserRole = () => {
        try {
            const documentRef = collection(db, 'conversations');
            return onSnapshot(documentRef, (snapshot) => {
                snapshot.docs.forEach((documents) => {
                    if (documents.id === conversationId) {
                        const documentData = documents.data();
                        const Admin = documentData.group;
                        if (Admin.admins.length > 0) {
                            if (documentData.users.includes(user.uid) && Admin.admins.includes(user.uid)) {
                                setUserRole(true);
                            } else {
                                setUserRole(false);
                            }
                        }
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(() => {
        hanleUserRole();
    }, [])




    return (
        <>

            <div className="flex">
                <SideBar />

                <div className="hidden flex-grow flex-col items-center justify-center gap-3 md:!flex">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/new-message.png" />
                    <h1 className="text-center">Select a conversation to start chatting</h1>
                </div>
            </div>
            {/* <AssignWorkForUser
                currentUser={user}
                uid={uid as string}
                conversationId={conversationId}
                userRole={userRole}
            /> */}
        </>
    )
}