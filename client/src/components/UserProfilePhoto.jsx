import {Box} from '@mui/material';


const UserProfilePhoto = ({ userPhoto, size = '60px'}) => {
  return (
    <Box width={size} height={size}>
      <img 
        style={{ objectFit: 'cover', borderRadius: '50%'}}
        width={size}
        height={size}
        alt="userPhoto"
        src={`http://localhost:8080/images/${userPhoto}`}
      />
    </Box>
  )
}

export default UserProfilePhoto;