import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom'

const styles = {
    root: {
        marginTop : 'auto'
    }
};

const Footer = () => {
    return (
        <div style={styles.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={styles.title}>
                        <Link to="/">ARRIVAE</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Footer