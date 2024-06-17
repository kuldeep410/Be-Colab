import React from 'react';

type interfaceProps = {
    currentUser: any;
    uid: string;
    conversationId: string;
    userRole: boolean;
}

export default function AssignWorkForUser(props: interfaceProps) {
    const { currentUser, uid, conversationId, userRole } = props;


    return (
        <>
            <div>
                <h2>hejej</h2>
            </div>
        </>
    )
}