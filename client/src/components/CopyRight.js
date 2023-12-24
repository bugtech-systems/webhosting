import { Link, Typography } from '@mui/material'
import React from 'react'

export default function CopyRight({ sx }) {
    return (
        <div>
            <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
                {'Copyright © '}
                <Link color="inherit" href="https://bugtech.solutions">
                    Shared Hosting
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    )
}
