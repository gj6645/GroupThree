import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core';
import { Typography } from '@mui/material';

export default function ConfirmDialog(props) {

    const {title, subTitle, color, ConfirmDialog, setConfirmDialog, setOpen} = props;

// TODO: Finish up implementation once delete icon functionality is added

    return (
        <Dialog open={ConfirmDialog.isOpen}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent>
            <Typography variant="h6">
                {title}
            </Typography>

            <Typography variant="subtitle2">
                {subTitle}
            </Typography>

        </DialogContent>
        <DialogActions>
        </DialogActions>
        </Dialog>
    )
}
