import config from 'src/config';

export const getImageUrl = (imagePath: string): string => {
  return `${config.SERVER_URL}/${imagePath}`;
};

export const getBackgroundUrl = (imagePath: string): string => {
  return `url(${config.SERVER_URL}/${imagePath}) no-repeat`;
};
