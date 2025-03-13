import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-animation">
        <img src="/gif/cat-gifs/loading.gif" alt="SousChef Loading" />
      </div>
      <p className="loading-text">Preheating something tasty...</p>
    </div>
  );
};

export default Loading;