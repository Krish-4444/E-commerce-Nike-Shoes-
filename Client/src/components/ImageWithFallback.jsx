const fallbackImage = 'https://via.placeholder.com/600x400?text=Image+Unavailable';

const ImageWithFallback = ({ src, alt, className, style }) => {
  const handleError = (e) => {
    // prevent infinite loop
    if (e.currentTarget.dataset.fallback === 'true') return;
    e.currentTarget.dataset.fallback = 'true';
    e.currentTarget.src = fallbackImage;
  };

  if (!src) {
    return <img src={fallbackImage} alt={alt} className={className} style={style} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;

