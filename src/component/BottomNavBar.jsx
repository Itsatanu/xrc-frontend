import React from 'react';
import styled from 'styled-components';
import { FaHome, FaGem, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Styled Components for the Bottom NavBar
const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  
  background-image: linear-gradient(90deg, rgb(245, 114, 36), rgb(255, 136, 67), rgb(251, 195, 163));
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 6%;
  width:100%;
  max-width:480px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-radius: 15px 15px 0 0; /* Optional: add rounded corners */
  padding: 10px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white; /* White text color to contrast with gradient background */
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  

  & span {
    font-size: 12px;
    color: white;
    text-transform: capitalize; /* Capitalizes the text */
  }
`;

// Special Diamond button with transparent circle effect
const DiamondButton = styled(NavButton)`
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: white; 
  color: #f57224; 
  top: -30px; 
  left: 0%;

  z-index: -1; /* Behind the button */

  & span {
    font-size: 12px;
  }
`;

// Bottom NavBar Component
const BottomNavBar = ({extaSpaceColor}) => {
    return (
        <BottomNavContainer >
            {/* Home Button */}
            <NavLink to={'/'} style={{textDecoration: 'none'}}>
                <NavButton>
                    <FaHome size={24} />
                    <span>Home</span>
                </NavButton>
            </NavLink>

            {/* VIP Button with special styling (Diamond Button) */}
            <NavLink to={'/vip'} style={{textDecoration: 'none'}}>
                <DiamondButton>
                    <FaGem size={35} />
                    <span style={{ color: '#f57224' }}>VIP</span>
                </DiamondButton>
            </NavLink>

            {/* Account Button */}
            <NavLink to={'/account'} style={{textDecoration: 'none'}}>
                <NavButton>
                    <FaUserCircle size={24} />
                    <span>Account</span>
                </NavButton>
            </NavLink>
        </BottomNavContainer>
    );
};

export default BottomNavBar;
