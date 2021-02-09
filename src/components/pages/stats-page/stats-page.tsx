import React from 'react';
import { useHistory } from 'react-router-dom';

const StatsPage: React.FC = () => {
  const history = useHistory();

  return (
    <main className="page page--stats">
      <h1 className="page__title">Статистика</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero, harum facilis quae alias molestiae provident laudantium? Quibusdam et dignissimos veniam voluptatem, ullam alias tenetur blanditiis, nam, sapiente doloribus dolore necessitatibus.</p>
      <button type="button" onClick={() => history.push('/')}>Вернуться к списку дел</button>
    </main >
  );
};

export default StatsPage;
