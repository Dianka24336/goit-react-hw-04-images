import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPixabayImg } from '../services/pixabayApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { StyledApp } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoadMore) {
        setImages([]);
        setPage(1);
      }

      setIsLoading(true);

      try {
        if (query === '') return;
        const fetchImages = await fetchPixabayImg(query, page);
        const { hits, totalHits } = fetchImages;

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);

        if (!totalHits) {
          return toast.info('Images not found. Please try again');
        }
      } catch (error) {
      
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page, isLoadMore]);

  const handleInputSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setIsLoadMore(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleOpenModal = image => {
    setIsOpen(true);
    setLargeImageURL(image);
    console.log('Image clicked:', image);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setLargeImageURL('');
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleInputSubmit} />
      <ImageGallery images={images} onOpenModal={handleOpenModal} />
      {isLoading && <Loader />}

      {images.length > 0 && images.length < totalHits && (
        <Button onClick={onLoadMore} />
      )}

      {isOpen && (
        <Modal
          largeImages={largeImageURL}
          images={images}
          onCloseModal={handleCloseModal}
        />
      )}
      <ToastContainer />
    </StyledApp>
  );
};
