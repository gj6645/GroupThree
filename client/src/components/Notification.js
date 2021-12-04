import React from 'react'
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';


export default function Notification(props) {

    const { notify, setNotify } = props;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify({
            ...notify,
            isOpen: false
        })
    };

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                severity={notify.type}
                color="info"
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
