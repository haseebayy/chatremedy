import { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

const CustomImage = ({ src, ...rest }) => {
  const [imageUrl, setImageUrl] = useState(src);

  useEffect(() => {
    const fetchImageWithHeaders = async () => {
      try {
        const headers = {
          'ngrok-skip-browser-warning': 'true',
        };

        const response = await fetch(src, { headers });
        if (response.ok) {
          const blob = await response.blob();
          setImageUrl(URL.createObjectURL(blob));
        } else {
          console.error('Failed to fetch image:', response.status);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImageWithHeaders();
  }, [src]);

  return <Avatar src={imageUrl} {...rest} />;
};

export default CustomImage;
