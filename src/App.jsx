import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from 'components/AppContainer/AppContainer.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImages } from 'services/images-api';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from './components/Button/Button';
import { Modal } from 'components/Modal/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [currentImage, setcurrentImage] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchData = async () => {
      setLoading(true);

      const { hits, total } = await getImages(query, page, handleError);
      const totalPages = Math.round(total / 12);

      page > 1 ? setImages(prevImg => [...prevImg, ...hits]) : setImages(hits);
      setLoading(false);
      setPagesAmount(totalPages);

      if (page === 1) {
        toast.success(`we found: ${total} images`);
      }
    };
    fetchData();
  }, [query, page]);

  const handleError = error => {
    toast.error(`${error.message}`);
    setLoading(false);
  };

  const handleFormSubmit = text => {
    setQuery(text);
    setPage(1);
  };
  const handleButtonLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalClose = () => {
    setcurrentImage(null);
  };

  const updateCurrentImage = shape => {
    setcurrentImage(shape);
  };

  return (
    <AppContainer>
      {currentImage && <Modal onClose={handleModalClose} data={currentImage} />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />

      {images && (
        <ImageGallery
          query={query}
          data={images}
          updateImage={updateCurrentImage}
        />
      )}
      {loading && <Loader />}
      {page <= pagesAmount && <LoadMoreBtn loadMore={handleButtonLoadMore} />}
    </AppContainer>
  );
}

export { App };
