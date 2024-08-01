import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  );
};

export default Loader;