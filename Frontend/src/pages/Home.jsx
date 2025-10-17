import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 120,
                }}
                whileHover={{
                    scale: 1.05,
                    rotate: 1,
                    textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                }}
                className="home-title"
            >
                Hello, this is Job Tracking App
            </motion.h1>

            {/* Continue Button */}
            <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/app/')}
                className="home-button"
            >
                Continue →
            </motion.button>
        </div>
    );
}

export default Home;
